const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");
const app = express();
const port = 3100;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.post("/upload-cv", upload.single("cv"), (req, res) => {
  const cvFile = req.file;

  if (!cvFile) {
    return res.status(400).json({ error: "No CV file provided" });
  }

  return res.json({ message: "CV uploaded successfully!" });
});

async function readCvFileContent(cvFile) {
  try {
    const dataBuffer = fs.readFileSync(cvFile.path);
    const dataString = dataBuffer.toString();
    const pdfData = await pdf(dataString);
    const pdfText = pdfData.text;
    console.log(pdfText)
    return pdfText;
  } catch (error) {
    console.error("Error reading PDF file:", error);
    throw error;
  }
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});