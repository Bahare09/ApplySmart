const port = 4000;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const { Pool } = require("pg");
const { uploadCv } = require("./functions/uploadCv");
const { SubmitText } = require("./functions/submitText");
const { jobsList } = require("./functions/jobsList");
const { saveJobs } = require("./functions/saveJobs");
const { result } = require("./functions/result");

app.use(express.json());
// Allow requests from your frontend domain
app.use(
  cors({

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

app.get("/", (req, res) => {
  res.send("Server is running.");
});
const upload = multer();
let cvId = null;

app.post("/upload-file", upload.single("file"), (req, res) => uploadCv(req, res, db));

// Route for handling text submissions
app.post("/submit-text", async (req, res) => SubmitText(req, res, db));

// Endpoint to generate job list
app.get("/generate-job-list", async (req, res) => jobsList(req, res, db));

app.post("/save-job-description", async (req, res) => saveJobs(req, res, db));

app.get("/generate-cv-coverLetter", async (req, res) => result(req, res, db));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
