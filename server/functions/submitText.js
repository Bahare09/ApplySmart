const { extractSkillsFromCV } = require("./openai")

const SubmitText = async (req, res, db) => {
    const { text, type } = req.body; // Access the submitted text and type (cv or job)

    if (!text || !type) {
        return res.status(400).json({ error: "Invalid text or type" });
    }

    try {
        if (type === "cv") {
            const skills = await extractSkillsFromCV(text); // Extract skills from the text

            // Insert CV text into the database and store the skills
            const cvInsertQuery =
                "INSERT INTO cv (cv_text, skill_words) VALUES ($1, $2) RETURNING cv_id";
            const cvInsertResult = await db.query(cvInsertQuery, [text, skills]);
            cvId = cvInsertResult.rows[0].cv_id;
            return res.json({
                message: "CV text submitted successfully!",
            });
        } else if (type === "job") {
            // Handle job description processing

            // Insert job description into the database without skills
            const jobInsertQuery =
                "INSERT INTO job_description (job_text, cv_id) VALUES ($1, $2)";
            await db.query(jobInsertQuery, [text, cvId]);
            return res.json({
                message: "Job description text submitted successfully!",
            });
        } else {
            return res.status(400).json({ error: "Invalid text type" });
        }
    } catch (error) {
        console.error("Error processing text submission:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the request." });
    }
}

module.exports = {
    SubmitText,
};