const port = 4000;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const { Pool } = require("pg");
const { uploadFile } = require("./functions/uploadFile");
const { SubmitText } = require("./functions/submitText");
const { jobsList } = require("./functions/jobsList");
const { individualJob } = require("./functions/individualJob");
const { sendJobDForView } = require("./functions/sendJobDForView");
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
app.post("/upload-file", upload.single("file"), (req, res) =>
  uploadFile(req, res, db)
);
app.post("/submit-text", async (req, res) => SubmitText(req, res, db));
app.get("/generate-job-list", async (req, res) => jobsList(req, res, db));
app.post("/individualJob", async (req, res) => individualJob(req, res, db));
// Corrected route registration
app.post("/sendJobDForView", async (req, res) => sendJobDForView(req, res, db));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
