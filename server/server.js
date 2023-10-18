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
const { PDFDocument, rgb } = require("pdf-lib");

app.use(express.json());
// Allow requests from your frontend domain
app.use(
  cors({
    origin: "https://applysmartc.onrender.com",
  })
);
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
          content: `take the following CV and extract the list of exactly 4 individual key word skills.${cvText}`,
        },
      ],
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("API response is invalid");
    }

    // Extracted skills are separated by line breaks, so split the content by line breaks
    const extractedSkills = response.choices[0].message.content
      .trim()
      .split("\n")
      .slice(2) // Skip the first two lines
      .filter((skill) => skill.trim()) // Filter out empty lines
      .map((skill) => skill.replace(/^\d+\.\s*/, "")); // Remove numbering

    // Extract the first 3 skills
    const keywords = extractedSkills.slice(0, 3);

    console.log(keywords);
    return keywords;
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
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
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
    return newCvandCoverLetter;
  } catch (error) {
    console.error("Error in tailorCvAndCreateCoverLetter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
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

async function createPdfFromText(cvText) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 600;
  const pageHeight = 800;
  const font = await pdfDoc.embedFont("Helvetica");

  const pages = [];
  const contentLines = cvText.split("\n");

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - 50;
  let currentPageIndex = 0;

  for (const line of contentLines) {
    if (currentY - 12 < 50) {
      currentPageIndex++;
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - 50;
    }

    currentPage.drawText(line, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    currentY -= 12;
    pages[currentPageIndex] = pages[currentPageIndex] || [];
    pages[currentPageIndex].push(line);
  }
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
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
      const skills = await extractSkillsFromCV(cvText); // Extract skills from the CV

      // Insert CV into the database and store the skills
      const cvInsertQuery =
        "INSERT INTO cv (cv_text, skill_words) VALUES ($1, $2) RETURNING cv_id";
      const cvInsertResult = await db.query(cvInsertQuery, [cvText, skills]);
      cvId = cvInsertResult.rows[0].cv_id;

      return res.json({
        message: "CV uploaded and processed successfully.",
        text: cvText,
      });
    } else if (fileType === "job") {
      // Handle job description processing
      const jobText = await readPdfFileContent(file);

      // Insert job description into the database
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

  try {
    if (type === "cv") {
      const skills = await extractSkillsFromCV(text); // Extract skills from the text

      // Insert CV text into the database and store the skills
      const cvInsertQuery =
        "INSERT INTO cv (cv_text, skill_words) VALUES ($1, $2) RETURNING cv_id";
      const cvInsertResult = await db.query(cvInsertQuery, [text, skills]);
      cvId = cvInsertResult.rows[0].cv_id;
      return res.json({
        message: "CV text submitted successfully!",
      });
    } else if (type === "job") {
      // Handle job description processing

      // Insert job description into the database without skills
      const jobInsertQuery =
        "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
      await db.query(jobInsertQuery, [text, cvId]);
      return res.json({
        message: "Job description text submitted successfully!",
      });
    } else {
      return res.status(400).json({ error: "Invalid text type" });
    }
  } catch (error) {
    console.error("Error processing text submission:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Endpoint to generate job list
app.get("/generate-job-list", async (req, res) => {
  if (!cvId) {
    return res.status(400).json({ error: "No CV uploaded yet." });
  }

  try {
    const cvQuery = "SELECT skill_words FROM cv WHERE cv_id = $1";
    const cvResult = await db.query(cvQuery, [cvId]);

    if (cvResult.rows.length === 0) {
      return res.status(404).json({ error: "CV not found." });
    }

    const skills = cvResult.rows[0].skill_words;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ error: "No skills extracted from CV." });
    }

    // Format the skills into a string without brackets and commas
    const formattedSkills = skills.join(" "); // Join skills with spaces

    const adzunaAppId = process.env.ADZUNA_APP_ID;
    const adzunaAppKey = process.env.ADZUNA_APP_KEY;

    // Use the formatted skills in the Adzuna API address
    const adzunaApiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&results_per_page=5&what_and=${formattedSkills}`;

    // Fetch job listings from the Adzuna API with the extracted skills
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
    // console.log(jobList);
  } catch (error) {
    console.error("Error generating job list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/save-job-description", async (req, res) => {
  const { description } = req.body;

  if (!cvId) {
    return res.status(400).json({ error: "No CV uploaded yet." });
  }

  if (!description) {
    return res.status(400).json({ error: "Invalid job description." });
  }

  try {
    // Insert job description into the database and associate it with the uploaded CV using cv_id
    const jobInsertQuery =
      "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
    await db.query(jobInsertQuery, [description, cvId]);

    return res.json({
      message: "Job description saved successfully!",
    });
  } catch (error) {
    console.error("Error saving job description:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/generate-cv-coverLetter", async (req, res) => {
  if (!cvId) {
    return res.status(400).json({ error: "No CV uploaded yet." });
  }
  try {
    const cvQuery = "SELECT cv_text FROM cv WHERE cv_id = $1";
    const cvResult = await db.query(cvQuery, [cvId]);
    const jobDescQuery =
      "SELECT job_text FROM job_description WHERE cv_id = $1";
    const jobResult = await db.query(jobDescQuery, [cvId]);
    if (cvResult.rows.length === 0) {
      return res.status(404).json({ error: "CV not found." });
    }

    const cvText = cvResult.rows[0].cv_text;
    const jobText = jobResult.rows[0].job_text;
    const newCv = await tailorCv(cvText, jobText);
    const cvDynamicContent = `${newCv}\n`;
    const cvPdfBytes = await createPdfFromText(cvDynamicContent);
    const coverLetter = await createCoverLetter(cvText, jobText);
    const coverLetterDynamicContent = `${coverLetter}\n`;
    const coverLetterPdfBytes = await createPdfFromText(
      coverLetterDynamicContent
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=multi-page.pdf");

    return res.json({
      message: "CV text retrieved successfully!",
      text: cvText,
      newCv: newCv,
      coverLetter: coverLetter,
      pdfBytes: cvPdfBytes,
      coverpdfBytes: coverLetterPdfBytes,
    });
  } catch (error) {
    console.error("Error retrieving CV text:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
