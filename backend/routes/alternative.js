import express from "express";
import { findAlternative } from "../controllers/alternativeController.js";

const router = express.Router();

router.post("/", findAlternative);

export default router;
