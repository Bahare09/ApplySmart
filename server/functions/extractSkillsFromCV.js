const OpenAI = require("openai");
require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });

const extractSkillsFromCV = async (cvText) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `take the following CV and extract the list of exactly 4 individual key word skills.${cvText}`,
                },
            ],
        });

        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error("API response is invalid");
        }

        // Extracted skills are separated by line breaks, so split the content by line breaks
        const extractedSkills = response.choices[0].message.content
            .trim()
            .split("\n")
            .slice(2) // Skip the first two lines
            .filter((skill) => skill.trim()) // Filter out empty lines
            .map((skill) => skill.replace(/^\d+\.\s*/, "")); // Remove numbering

        // Extract the first 3 skills
        const keywords = extractedSkills.slice(0, 3);

        console.log(keywords);
        return keywords;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
}


module.exports = {
    extractSkillsFromCV,
};
