const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });
const modelVersion =
  process.env.NODE_ENV === "production" ? "gpt-3.5-turbo" : "gpt-3.5-turbo";

const tailorCv = async (cvText, jobText) => {
  try {
    const response = await openai.chat.completions.create({
      model: modelVersion,
      messages: [
        {
          role: "user",
          content: `take the following CV and Job description then create a tailor cv depends on job description ,prioritize accuracy over creativity. Do not include information in the new CV that the candidate doesn't know or hasn't experienced.and dont use any words from job description inside the new cv.
          cv: ${cvText}  job description :${jobText}`,
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
};
module.exports = {
  tailorCv,
};
