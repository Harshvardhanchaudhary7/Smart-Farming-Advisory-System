import express from "express";
import { login, register, getProfile, updateProfile, changePassword, forgotPassword, } from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/profile", protect, getProfile);
router.put( "/profile", protect, upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  updateProfile
);
router.put("/change-password", protect, changePassword );
router.put("/forgot-password", forgotPassword);
 
export default router;