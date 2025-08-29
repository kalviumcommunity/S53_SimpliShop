const express = require("express");
const router = express.Router();
const searchRoutes = require("./search.js");
const compareRoutes = require("./compare.js");
const alternativeRoutes = require("./alternative.js");
const assistantRoutes = require("./assistant.js");

router.use("/search", searchRoutes);
router.use("/compare", compareRoutes);
router.use("/alternative", alternativeRoutes);
router.use("/chat", assistantRoutes);

module.exports = router;
