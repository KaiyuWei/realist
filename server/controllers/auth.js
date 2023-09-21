/**
 * controllers in auth middlewares
 */

import * as config from '../config.js';
import jwt from "jsonwebtoken";
import {emailTemplate} from "../helpers/email.js";

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from routes',
    })
};

/**
 *  send an email for activating the account
 */
export const preRegister = async (req, res) => {
    // generate a clickable link containing jwt for authenticating the email address
    // only when this link is clicked, the registration completes
    
    // the email and password from the request body
    const {email, password} = req.body;

    // the token for user identification
    const token = jwt.sign({email, password}, config.JWT_SECRET, {
        expiresIn: "1h",
    });

    // the email body content
    const content = `
        <p>Click the link below to activate your account</p>
        <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate account</a>
    `;

    // send the email
    config.AWSSES.sendEmail(
        
        // the helper function returns the first argument of the ::sendEmail() method
        emailTemplate(email, content, config.REPLY_TO, "Activate your account"),

        // error handler
        (err, data) => {
            // console.log("REGION: " + config.apiVersion);
            if (err) {
               console.log(err);
                return res.json({ok: false});
            }
            else {
               console.log(data);
                return res.json({ok: true});
            }
    });
};

/**
 * register the user after activating the account
 */
export const register = async (req, res) => {
    try {
        // decode the jwt token with the jwt token
        const {email, password} = jwt.verify(req.body.token, config.JWT_SECRET);
    } catch (err) {

    }
}