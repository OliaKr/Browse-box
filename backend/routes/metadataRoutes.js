const express = require("express");

const { getMetadata } = require("../controllers/metatadataController");

const router = express.Router();

router.post("/fetch-metadata", getMetadata);

module.exports = router;
