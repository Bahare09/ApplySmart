const { tailorCv, createCoverLetter } = require("./openai");

const processDataForJob = async (cvId, description, db, res) => {
    if (!cvId) {
        return res.status(400).json({ error: "No CV uploaded yet." });
    }

    if (!description) {
        return res.status(400).json({ error: "Invalid job description." });
    }

    try {
        const [cvResult, jobResult] = await Promise.all([
            db.query("SELECT cv_text FROM cv WHERE cv_id = $1", [cvId]),
            description,
        ]);

        if (cvResult.rows.length === 0) {
            return res.status(404).json({ error: "CV not found." });
        }

        const cvText = cvResult.rows[0].cv_text;
        const jobText = jobResult;

        const [newCv, coverLetter] = await Promise.all([
            tailorCv(cvText, jobText),
            createCoverLetter(cvText, jobText),
        ]);

        console.log(newCv, coverLetter);
        return res.json({
            message: "CV text retrieved successfully!",
            newCv: newCv,
            coverLetter: coverLetter,
        });
    } catch (error) {
        console.error("Error retrieving CV text:", error);
        res.status(500).json({
            error: "An error occurred while processing the request.",
        });
    }
};

module.exports = {
    processDataForJob,
};
