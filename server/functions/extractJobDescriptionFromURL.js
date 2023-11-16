const cheerio = require("cheerio");

const extractJobDescriptionFromURL = async (redirectUrl) => {
  try {
    const response = await fetch(redirectUrl);
    const extractJobDescriptionFromURL = async (redirectUrl) => {
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const fullJobDescriptionText = $("section.adp-body").text().split('\n\n');

    // console.log("Full Job Description Text:", fullJobDescriptionText);

    return fullJobDescriptionText;
  } catch (error) {
    console.error("Error extracting job description:", error.message);
    return null;
  }
};

module.exports = {
  extractJobDescriptionFromURL,
};