import express from "express";
import { getCropAdvice } from "../controllers/aiController.js";

const router = express.Router();

router.post("/recommend", getCropAdvice);

export default router;