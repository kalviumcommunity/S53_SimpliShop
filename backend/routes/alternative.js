const express = require("express");
const { findAlternative } = require("../controllers/alternativeController");

const router = express.Router();

router.post("/", findAlternative);

module.exports = router;
