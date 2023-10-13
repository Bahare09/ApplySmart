const port = 4000;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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

app.post("/upload-cv", upload.single("cv"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No CV file provided" });
  }

  const { path } = req.file;

  try {
    const cvText = await readPdfFileContent(path);
    console.log("PDF Text:", cvText);
    res.json({
      message: "File uploaded and parsed successfully.",
      pdfText: cvText,
    });
  } catch (error) {
    console.error("PDF parsing error:", error);
    res.status(500).json({ message: "Error parsing the PDF file." });
  }
});
