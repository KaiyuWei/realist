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
// for registration create a user in mongoDB.
router.post("/register", auth.register);
// user login api
router.post("/login", auth.login);

export default router;