const dotenv = require("dotenv");
require("dotenv").config();

const jobsList = async (req, res, db) => {
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
    // Fetch job listings from the Adzuna API with the extracted skills
    const adzunaApiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&results_per_page=20&what_and=${formattedSkills}`;

    const response = await fetch(adzunaApiUrl);

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      const text = await response.text();
      console.error("API response text:", text);
      throw new Error("Failed to fetch job listings");
    }

    const data = await response.json();
    const allJobs = data.results;

    // Filter jobs based on the redirect link format
    const matchingJobs = allJobs.filter(
      (job) =>
        job.redirect_url &&
        job.redirect_url.startsWith("https://www.adzuna.co.uk/jobs/details/")
    );

    const jobList = matchingJobs;
    res.json({ jobList });
  } catch (error) {
    console.error("Error generating job list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  jobsList,
};
