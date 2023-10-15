const port = 4000;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const { Pool } = require("pg")

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

async function readPdfFileContent(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error reading PDF file:", error);
    throw error;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  },
});

const upload = multer({ storage });
app.get("/", (req, res) => {
  res.send("Server is running.");
});

let cvId = null;
app.post("/upload-file", upload.single("file"), async (req, res) => {
  const { file } = req;
  const fileType = req.body.type; // Access the type field (cv or job)

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const { path } = file;

  try {
    // Determine if it's a CV or job description based on the fileType
    if (fileType === "cv") {
      // Handle CV processing
      const cvText = await readPdfFileContent(path);
      console.log("CV Text:", cvText);
      const cvInsertQuery = "INSERT INTO cv (cv_text) VALUES ($1) RETURNING cv_id";
      const cvInsertResult = await db.query(cvInsertQuery, [cvText]);
      cvId = cvInsertResult.rows[0].cv_id;

      return res.json({
        message: "CV uploaded and processed successfully.",
        text: cvText,
      });

    } else if (fileType === "job") {
      // Handle job description processing
      const jobText = await readPdfFileContent(path);
      const jobInsertQuery = "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
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
    const cvInsertQuery =
      "INSERT INTO cv (cv_text) VALUES ($1) RETURNING cv_id";
    const cvInsertResult = await db.query(cvInsertQuery, [text]);
    cvId = cvInsertResult.rows[0].cv_id;
    return res.json({ message: "CV text submitted successfully!" });
  } else if (type === "job") {
    return res.json({
      message: "Job description text submitted successfully!",
    });
  } else {
    return res.status(400).json({ error: "Invalid text type" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
