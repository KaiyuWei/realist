/**
 * the file for authentication and authorization routing
 */
import express from "express";
import {welcome} from "../controllers/auth.js";

const router = express.Router();

// for get requests in '/api' endpoint
router.get('/', welcome);

export default router;