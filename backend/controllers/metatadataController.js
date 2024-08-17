const { fetchMetadata } = require("../models/metadataModel");
async function getMetadata(req, res) {
  const { urls } = req.body;
  console.log("Incoming URLs:", urls);

  if (!urls || !Array.isArray(urls) || urls.length < 3) {
    return res
      .status(400)
      .json({ error: "Please provide at least 3 valid URLs" });
  }

  try {
    const metadataPromises = urls.map(async (url) => {
      try {
        console.log(`Fetching metadata for: ${url}`);
        const metadata = await fetchMetadata(url);
        return { url, metadata };
      } catch (error) {
        console.error(`Error fetching metadata for ${url}:`, error.message);
        return { url, error: error.message };
      }
    });

    const results = await Promise.all(metadataPromises);
    console.log("Fetched metadata results:", results);
    res.json(results);
  } catch (error) {
    console.error("Error in getMetadata controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { getMetadata };
