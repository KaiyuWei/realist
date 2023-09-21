/**
 * helper in the auth process
 */

import bcrypt from 'bcrypt';

/**
 * the function that returns a hashed password
 * @param string the password to be hashed
 * @return string tha hashed password
 */
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            // handle the error
            if (err) {
                reject(err);
            }

            // if no error, hash the password with the generated salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}