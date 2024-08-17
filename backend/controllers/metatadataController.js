const { fetchMetadata } = require("../models/metadataModel");

async function getMetadata(req, res) {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length < 3) {
    return res
      .status(400)
      .json({ error: "Please provide at least 3 valid URLs" });
  }

  try {
    const metadataPromises = urls.map(async (url) => {
      try {
        const metadata = await fetchMetadata(url);
        return { url, metadata };
      } catch (error) {
        return { url, error: error.message };
      }
    });

    const results = await Promise.all(metadataPromises);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getMetadata };
