const {
  extractJobDescriptionFromURL,
} = require("./extractJobDescriptionFromURL");

const { processDataForJob } = require("./processDataForJob");

const individualJob = async (req, res, db) => {
  try {
    const { Url } = req.body;

    // Check if Url is provided
    if (!Url) {
      return res
        .status(400)
        .json({ error: "Url is required in the request body" });
    }

    // Extract job description from the provided URL
    const Description = await extractJobDescriptionFromURL(Url);

    // Pass the extracted job description to the processDataForJob function
    await processDataForJob(cvId, Description, db, res, Url);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  individualJob,
};
