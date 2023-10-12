const express = require("express");
const app = express();
const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Hello, Node.js Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
