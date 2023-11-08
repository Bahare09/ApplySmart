const dotenv = require("dotenv");
require('dotenv').config();

const saveJobs = async (req, res, db) => {
    const { description } = req.body;

    if (!cvId) {
        return res.status(400).json({ error: "No CV uploaded yet." });
    }

    if (!description) {
        return res.status(400).json({ error: "Invalid job description." });
    }

    try {
        // Insert job description into the database and associate it with the uploaded CV using cv_id
        const jobInsertQuery =
            "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
        await db.query(jobInsertQuery, [description, cvId]);

        return res.json({
            message: "Job description saved successfully!",
        });
    } catch (error) {
        console.error("Error saving job description:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    saveJobs,
};