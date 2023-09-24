/**
 * router for APIs about ads in the web app
 */

import express from "express";
import * as ad from "../controllers/ad.js";
import { requireSignin } from "../middlewares/auth.js";

const router = express.Router();

/**
 * API for uploading images
 */
router.post("/upload-image", requireSignin, ad.uploadImage);

export default router;
