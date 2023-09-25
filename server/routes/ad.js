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

router.post("/remove-image", requireSignin, ad.removeImage);

router.post("/ad", requireSignin, ad.create);
// query ads from mongodb
router.get("/ads", ad.ads);

export default router;
