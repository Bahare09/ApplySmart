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
};

module.exports = {
  createCoverLetter,
};
