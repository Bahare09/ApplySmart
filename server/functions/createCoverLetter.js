const OpenAI = require("openai");
const dotenv = require("dotenv");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });
const modelVersion =
  process.env.NODE_ENV === "production" ? "gpt-3.5-turbo" : "gpt-3.5-turbo";

const createCoverLetter = async (cvText, jobText) => {
  try {
    const response = await openai.chat.completions.create({
      model: modelVersion,
      messages: [
        {
          role: "user",
          content: `Generate a distinctive cover letter that goes beyond duplicating information from my CV (${cvText}). Instead, focus on highlighting specific aspects of my experience, skills, and achievements that directly align with the requirements outlined in the job description (${jobText}).
           Prioritize uniqueness and provide a fresh perspective that sets the cover letter apart from the CV. Avoid redundant details already present in the CV and emphasize what makes me uniquely qualified for this position. #CreativeCoverLetter`
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
};

module.exports = {
  createCoverLetter,
};
