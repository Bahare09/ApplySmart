const cheerio = require("cheerio");

const extractJobDescriptionFromURL = async (redirectUrl) => {
  try {
    const response = await fetch(redirectUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch job page. Status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const fullJobDescriptionText = $("section.adp-body").text();

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