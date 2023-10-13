const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3100;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/upload-cv", upload.single("cv"), (req, res) => {
  const cvFile = req.file; // Access the uploaded CV file

  if (!cvFile) {
    return res.status(400).json({ error: "No CV file provided" });
  }

  return res.json({ message: "CV uploaded successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});