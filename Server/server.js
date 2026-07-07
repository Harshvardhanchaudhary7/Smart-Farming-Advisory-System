import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import cropHistoryRoutes from "./routes/cropHistoryRoutes.js";



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/history", cropHistoryRoutes);

app.get("/",(req,res) => {
    res.send("AgriSense API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`);
});