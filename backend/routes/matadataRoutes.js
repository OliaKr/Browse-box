const express = require("express");

const { getMetadata } = require("../controllers/metadataController");

const router = express.Router();

router.post("/fetch-metadata", getMetadata);

module.exports = router;
