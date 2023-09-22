/**
 * middlewares in auth process
 */

import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js";

/**
 * check if a user is signed in
 */
export const requireSignin = (req, res, next) => {
    try {
        console.log(req.headers);
        // decode the token in the request header
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);

        // user data from the decoded token
        req.user = decoded;

        // the next middleware
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error: "Invalid or expired token"});
    }
};