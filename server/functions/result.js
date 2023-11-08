const { tailorCv, createCoverLetter } = require("./openai")
const { createPdfFromText } = require("./pdf")


const result = async (req, res, db) => {
    if (!cvId) {
        return res.status(400).json({ error: "No CV uploaded yet." });
    }

    try {
        const [cvResult, jobResult] = await Promise.all([
            db.query("SELECT cv_text FROM cv WHERE cv_id = $1", [cvId]),
            db.query("SELECT job_text FROM job_description WHERE cv_id = $1", [cvId]),
        ]);

        if (cvResult.rows.length === 0) {
            return res.status(404).json({ error: "CV not found." });
        }

        const cvText = cvResult.rows[0].cv_text;
        const jobText = jobResult.rows[0].job_text;

        const [newCv, coverLetter] = await Promise.all([
            tailorCv(cvText, jobText),
            createCoverLetter(cvText, jobText),
        ]);

        const [cvPdfBytes, coverLetterPdfBytes] = await Promise.all([
            createPdfFromText(`${newCv}\n`),
            createPdfFromText(`${coverLetter}\n`),
        ]);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=multi-page.pdf");
        return res.json({
            message: "CV text retrieved successfully!",
            text: cvText,
            newCv: newCv,
            coverLetter: coverLetter,
            pdfBytes: cvPdfBytes,
            coverpdfBytes: coverLetterPdfBytes,
        });
    } catch (error) {
        console.error("Error retrieving CV text:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }

}

module.exports = {
    result
}