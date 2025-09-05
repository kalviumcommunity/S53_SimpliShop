import express from "express";
import { searchProduct } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchProduct);

export default router;
