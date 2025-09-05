import express from "express";

const router = express.Router();

import searchRoutes from "./search.js";
import compareRoutes from "./compare.js";
import alternativeRoutes from "./alternative.js";
import assistantRoutes from "./assistant.js";

router.use("/search", searchRoutes);
router.use("/compare", compareRoutes);
router.use("/alternative", alternativeRoutes);
router.use("/chat", assistantRoutes);

export default router;