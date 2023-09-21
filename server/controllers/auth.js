/**
 * controllers in auth middlewares
 */

import * as config from '../config.js';

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from routes',
    })
};

export const preRegister = async (req, res) => {
    // generate a clickable link containing jwt for authenticating the email address
    // only when this link is clicked, the registration completes
    console.log(req.body);
    AWSSES.sendEmail(
    {
        Source: config.EMAIL_FROM,
        // a hard-coded email address for developing
        Destination: "weikaiyu2020@outlook.com",
    }, 
    (err, data) => {
        if (err) {
           console.log(err);
            return res.jsoon({ok: false});
        }
        else {
           console.log(data);
            return res.json({ok: true});
        }
    });
};