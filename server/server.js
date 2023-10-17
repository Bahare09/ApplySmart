const port = 4000;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdf = require("pdf-parse");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const { Pool } = require("pg");
const OpenAI = require("openai");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });
async function extractSkillsFromCV(cvText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `take the following CV and extract the list of key skills.${cvText}`,
        },
      ],
    });
    console.log(response);
    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("API response is invalid");
    }
    const extractedSkills = response.choices[0].message.content.trim();
    const extractedSkillsArray = extractedSkills.split("\n");
    console.log(extractedSkillsArray);
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

async function tailorCv(cvText, jobText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `take the following CV and Job description then create a new cv depends on job description. cv: ${cvText}  job description :${jobText}`,
        },
      ],
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("API response is invalid");
    }
    const tailoredCv = response.choices[0].message.content.trim();
    return tailoredCv;
  } catch (error) {
    console.error("Error in tailorCvAndCreateCoverLetter:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}

async function createCoverLetter(cvText, jobText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `take the following CV and Job description then create a cover lettr depends on job description. cv: ${cvText}  job description :${jobText}`,
        },
      ],
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("API response is invalid");
    }
    const newCvandCoverLetter = response.choices[0].message.content.trim();
    return newCvandCoverLetter
  } catch (error) {
    console.error("Error in tailorCvAndCreateCoverLetter:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}

async function readPdfFileContent(file) {
  try {
    const buffer = file.buffer;
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("Error reading PDF file:", error);
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("Server is running.");
});
const upload = multer();
let cvId = null;
app.post("/upload-file", upload.single("file"), async (req, res) => {
  const { file } = req;
  const fileType = req.body.type; // Access the type field (cv or job)

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  try {
    // Determine if it's a CV or job description based on the fileType
    if (fileType === "cv") {
      // Handle CV processing
      const cvText = await readPdfFileContent(file);
      console.log("CV Text:", cvText);
      const skills = await extractSkillsFromCV(cvText);
      console.log(skills);
      const cvInsertQuery =
        "INSERT INTO cv (cv_text) VALUES ($1) RETURNING cv_id";
      const cvInsertResult = await db.query(cvInsertQuery, [cvText]);
      cvId = cvInsertResult.rows[0].cv_id;

      return res.json({
        message: "CV uploaded and processed successfully.",
        text: cvText,
      });
    } else if (fileType === "job") {
      // Handle job description processing
      const jobText = await readPdfFileContent(file);
      const jobInsertQuery =
        "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
      await db.query(jobInsertQuery, [jobText, cvId]);

      return res.json({
        message: "Job description uploaded and processed successfully.",
        text: jobText,
      });
    } else {
      return res.status(400).json({ error: "Invalid file type" });
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Route for handling text submissions
app.post("/submit-text", async (req, res) => {
  const { text, type } = req.body; // Access the submitted text and type (cv or job)

  if (!text || !type) {
    return res.status(400).json({ error: "Invalid text or type" });
  }

  if (type === "cv") {
    const skills = await extractSkillsFromCV(text);
    console.log(skills);
    const cvInsertQuery =
      "INSERT INTO cv (cv_text) VALUES ($1) RETURNING cv_id";
    const cvInsertResult = await db.query(cvInsertQuery, [text]);
    cvId = cvInsertResult.rows[0].cv_id;
    return res.json({ message: "CV text submitted successfully!" });
  } else if (type === "job") {
    const jobInsertQuery =
      "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
    await db.query(jobInsertQuery, [text, cvId]);
    return res.json({
      message: "Job description text submitted successfully!",
    });
  } else {
    return res.status(400).json({ error: "Invalid text type" });
  }
});
// Endpoint to generate job list
app.get("/generate-job-list", async (req, res) => {
  try {
    const adzunaAppId = process.env.ADZUNA_APP_ID;
    const adzunaAppKey = process.env.ADZUNA_APP_KEY;

    const adzunaApiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&results_per_page=5&what_and=javascript%20css`;

    // Fetch job listings from the Adzuna Api
    const response = await fetch(adzunaApiUrl);

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      const text = await response.text();
      console.error("API response text:", text);
      throw new Error("Failed to fetch job listings");
    }

    const data = await response.json();
    const jobList = data.results;
    res.json({ jobList });
    console.log(jobList);
  } catch (error) {
    console.error("Error generating job list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
