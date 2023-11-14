const { processDataForJob } = require("./processDataForJob");


const individualJob = async (req, res, db) => {
    const { description } = req.body;

    // Pass the description to the processDataForJob function
    await processDataForJob(cvId, description, db, res);
};

module.exports = {
    individualJob,
};