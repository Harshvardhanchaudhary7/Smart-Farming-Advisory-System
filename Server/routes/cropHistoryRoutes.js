import express from "express";

import { saveCropHistory, getCropHistory, deleteHistory,} from "../controllers/cropHistoryController.js";
import { downloadHistoryPDF,  downloadWeatherPDF,  downloadCropReport,} from "../controllers/reportController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// Save Crop History
router.post("/", protect, saveCropHistory);
router.get("/", protect, getCropHistory);
router.delete("/:id", protect, deleteHistory);
router.get( "/download", protect, downloadHistoryPDF);
router.get("/weather-report", protect, downloadWeatherPDF);
router.get( "/crop-report", protect,downloadCropReport);

export default router;