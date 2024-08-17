const axios = require("axios");
const cheerio = require("cheerio");

async function fetchMetadata(url) {
  try {
    const response = await axios.get(url);
    console.log(`Fetched data from ${url} with status: ${response.status}`);
    console.log(response.data);
    const html = response.data;
    const metadata = extractMetadata(html);
    return metadata;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw new Error("Failed to fetch metadata");
  }
}

function extractMetadata(html) {
  const $ = cheerio.load(html);
  const title = $("title").text() || "No title available";
  const description =
    $('meta[name="description"]').attr("content") || "No description available";
  const image =
    $('meta[property="og:image"]').attr("content") ||
    "https://example.com/default-image.jpg";
  return { title, description, image };
}

module.exports = { fetchMetadata };
