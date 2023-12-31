/**
 * the file for authentication and authorization routing
 */
import express from "express";
import * as auth from "../controllers/auth.js";
import { requireSignin } from "../middlewares/auth.js";

const router = express.Router();

// for get requests in '/' endpoint
router.get("/", requireSignin, auth.welcome);
// send a email with a link for activating the account
router.post("/pre-register", auth.preRegister);
// for registration and creating a user in mongoDB.
router.post("/register", auth.register);
// user login api
router.post("/login", auth.login);
// user forgets password
router.post("/forgot-password", auth.forgotPassword);
// access the account by a token (for resetting user password)
router.post("/access-account", auth.accessAccount);
// if the login token expires, request a new login token by the refresh token
router.get("/refresh-token", auth.refreshToken);
// get the currently logged-in user
router.get("/current-user", requireSignin, auth.currentUser);
// get user profile (no signin required)
router.get("/profile/:username", auth.publicProfile);
// updating password
router.put("/update-password", requireSignin, auth.updatePassword);
// updating user profiles
router.put("/update-profile", requireSignin, auth.updateProfile);

// this is a test api
router.get("/the-server-is-running", (req, res) => {
  res.send("OK!");
});

export default router;
