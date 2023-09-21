/**
 * the file for authentication and authorization routing
 */
import express from "express";
import * as auth from "../controllers/auth.js";

const router = express.Router();

// for get requests in '/' endpoint
router.get("/", auth.welcome);
// the middleware users before authenticating their email address
router.post("/pre-register", auth.preRegister);
// for destructure the email activation link and create a user.
router.post("/register", auth.register);

export default router;