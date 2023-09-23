/**
 * middlewares in auth process. checks the login token and adds the decoded user
 * date in the req data.
 */

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

/**
 * check if a user is signed in
 */
export const requireSignin = (req, res, next) => {
  try {
    // decode the token in the request header
    const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);

    // user data from the decoded token
    req.user = decoded;

    // the next middleware
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
