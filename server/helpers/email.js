/**
 * reusable code for email templates
 */
import * as config from "../config.js";

// the style used for the email template
const style = `
    background: #eee;
    padding: 30px;
    border-radius 20px;
`;

/**
 * a function that returns options for AWSSES sendEmail method
 */
export const emailTemplate = (email, content, replyTb, subject) => {
    return {
        Source: config.EMAIL_FROM,
        // a hard-coded email address for developing
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:`
                        <html>
                            <div style="${style}">
                            <h1>Welcome to Realist</h1>
                            ${content}
                            <p>&copy; ${new Date().getFullYear()}</p>
                            </div>
                        </html>
                    `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Welcome to Realist",
            }
        },
    };
};