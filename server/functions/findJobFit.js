const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });
const modelVersion =
  process.env.NODE_ENV === "production" ? "gpt-4" : "pt-3.5-turbo";

const findJobFit = async (cvText, description) => {
  try {
    const response = await openai.chat.completions.create({
      model: modelVersion,
      messages: [
        {
          role: "user",
          content: `Rate the fit of the following CV with the provided job description on a scale of 1 to 10. Example: 8 out of 10. CV: ${cvText}. Job Description: ${description}`,
        },
      ],
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("API response is invalid");
    }

    const jobFit = response.choices[0].message.content.trim();
    return jobFit;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

module.exports = {
  findJobFit,
};
