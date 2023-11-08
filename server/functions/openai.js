const OpenAI = require("openai");
const dotenv = require("dotenv");
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


const tailorCv = async (cvText, jobText) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `take the following CV and Job description then create a new cv depends on job description. cv: ${cvText}  job description :${jobText}`,
                },
            ],
        });

        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error("API response is invalid");
        }
        const tailoredCv = response.choices[0].message.content.trim();
        return tailoredCv;
    } catch (error) {
        console.error("Error in tailorCvAndCreateCoverLetter:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the request." });
    }
}

const createCoverLetter = async (cvText, jobText) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `take the following CV and Job description then create a cover lettr depends on job description. cv: ${cvText}  job description :${jobText}`,
                },
            ],
        });

        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error("API response is invalid");
        }
        const newCvandCoverLetter = response.choices[0].message.content.trim();
        return newCvandCoverLetter;
    } catch (error) {
        console.error("Error in tailorCvAndCreateCoverLetter:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the request." });
    }
}


module.exports = {
    extractSkillsFromCV,
    tailorCv,
    createCoverLetter
};