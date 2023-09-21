/**
 * controllers in auth middlewares
 */

import * as config from '../config.js';
import jwt from "jsonwebtoken";

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from routes',
    })
};

export const preRegister = async (req, res) => {
    // generate a clickable link containing jwt for authenticating the email address
    // only when this link is clicked, the registration completes
    
    // the email and password from the request body
    const {email, password} = req.body;
    const token = jwt.sign({email, password}, config.JWT_SECRET, {
        expiresIn: "1h",
    });
    config.AWSSES.sendEmail(
    {
        Source: config.EMAIL_FROM,
        // a hard-coded email address for developing
        Destination: {
            ToAddresses: ["weikaiyu2020@outlook.com"],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:`
                        <html>
                            <h1>Welcome to Realist</h1>
                            <p>Click the link below to activate your account</p>
                            <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate account</a>
                        </html>
                    `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Welcome to Realist",
            }
        },
    },  
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

export const register = async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {

    }
}