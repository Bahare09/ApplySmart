const dotenv = require("dotenv");
require('dotenv').config();

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

        // Use the formatted skills in the Adzuna API address
        const adzunaApiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&results_per_page=5&what_and=${formattedSkills}`;

        // Fetch job listings from the Adzuna API with the extracted skills
        const response = await fetch(adzunaApiUrl);

        if (!response.ok) {
            console.error("API request failed with status:", response.status);
            const text = await response.text();
            console.error("API response text:", text);
            throw new Error("Failed to fetch job listings");
        }

        const data = await response.json();
        const jobList = data.results;
        res.json({ jobList });
        // console.log(jobList);
    } catch (error) {
        console.error("Error generating job list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    jobsList,
};