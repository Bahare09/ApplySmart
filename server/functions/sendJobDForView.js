const {
  extractJobDescriptionFromURL,
} = require("./extractJobDescriptionFromURL");
const sendJobDForView = async (req, res, db) => {
  const { Url } = req.body;
  console.log(Url);
  // Check if Url is provided
  if (!Url) {
    return res
      .status(400)
      .json({ error: "Url is required in the request body" });
  }
  try {
    const fullJobDescription = await extractJobDescriptionFromURL(Url);
    console.log(fullJobDescription);
    res.json({ fullJobDescription: fullJobDescription });
  } catch (error) {
    console.error("Error extracting job description:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { sendJobDForView };
