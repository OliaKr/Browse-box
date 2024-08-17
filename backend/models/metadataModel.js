const axios = require("axios");

async function fetchMetadata(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const metadata = extractMetadata(html);
    return metadata;
  } catch (error) {
    throw new Error("Failed to fetch metadata");
  }
}

module.exports = { fetchMetadata };
