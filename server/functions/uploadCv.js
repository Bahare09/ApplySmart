const { readPdfFileContent } = require("./pdf");
const { extractSkillsFromCV } = require("./openai");
const { processDataForJob } = require("./processDataForJob");
const uploadCv = async (req, res, db) => {
    const { file } = req;
    const fileType = req.body.type; // Access the type field (cv or job)

    if (!file) {
        return res.status(400).json({ error: "No file provided" });
    }

    try {
        // Determine if it's a CV or job description based on the fileType
        if (fileType === "cv") {
            // Handle CV processing
            const cvText = await readPdfFileContent(file);
            const skills = await extractSkillsFromCV(cvText); // Extract skills from the CV

            // Insert CV into the database and store the skills
            const cvInsertQuery =
                "INSERT INTO cv (cv_text, skill_words) VALUES ($1, $2) RETURNING cv_id";
            const cvInsertResult = await db.query(cvInsertQuery, [cvText, skills]);
            cvId = cvInsertResult.rows[0].cv_id;

            return res.json({
                message: "CV uploaded and processed successfully.",
                text: cvText,
            });
        } else if (fileType === "job") {
            // Handle job description processing
            const jobText = await readPdfFileContent(file);
            // creating all required Data for individual job page based on cv and job desc
            await processDataForJob(cvId, jobText, db, res);

        } else {
            return res.status(400).json({ error: "Invalid file type" });
        }
    } catch (error) {
        console.error("Error processing file:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the request." });
    }
}

module.exports = {
    uploadCv,
};
