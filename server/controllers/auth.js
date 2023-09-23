/**
 * controllers in auth process
 */

import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import validator from "email-validator";

/**
 * a helper function for updating the login token and the refresh token
 */
const tokenAndUserResponse = (req, res, user) => {
  // create jwt tokens
  // token for login
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });

  // token for generating new login token
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  // sent response
  // do not send the password in the response, so we set them to 'undefined'
  // just in the response (the real password is saved in the database already)
  user.password = undefined;
  user.resetCode = undefined;

  // return the data in json format
  return res.json({
    token,
    refreshToken,
    user,
  });
};

export const welcome = (req, res) => {
  res.json({
    data: "hello from nodejs api from routes",
  });
};

/**
 * send an email for activating the account. The email contains a
 * a clickable link with jwt for authenticating the email address
 * only when this link is clicked, the registration completes
 */
export const preRegister = async (req, res) => {
  try {
    // the email and password from the request body
    const { email, password } = req.body;

    // validate the email and the password
    if (!validator.validate(email)) {
      return res.json({ error: "A valid email is required" });
    }
    if (!password) {
      return res.json({ error: "password is required" });
    }
    if (password.length < 6) {
      return res.json({ error: "password should be at least 6 characters" });
    }

    // check if the email has been registerd
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "Email is taken" });
    }

    // the token for user identification
    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    // the email body content
    const content = `
            <p>Click the link below to activate your account</p>
            <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate account</a>`;

    // send the email
    config.AWSSES.sendEmail(
      // the helper function returns the first argument of the ::sendEmail() method
      emailTemplate(email, content, config.REPLY_TO, "Activate your account"),

      // error handler
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        } else {
          console.log(data);
          return res.json({ ok: true });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: "something went wrong" });
  }
};

/**
 * register the user after activating the account
 */
export const register = async (req, res) => {
  try {
    // decode the jwt token with the jwt token
    const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create a user and save it.
    const user = await new User({
      username: nanoid(6), // a random unique id with 6 characters
      email,
      password: hashedPassword,
    }).save();

    // return the use data and updated login token
    return tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

/**
 * this function handles user login process
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });

    // if no existing users with the given email address
    if (!user) throw new Error(`cannot find a user with email ${email}`);

    // compare the password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "wrong password" });
    }

    // return the use data and updated login token
    return tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: err.toString() });
  }
};

/**
 * this function handles the user password reset process in case that a user forgets password
 * users can reset password by email address
 */
export const forgotPassword = async (req, res) => {
  try {
    // get the input email address
    const { email } = req.body;

    // try finding a user with the given email address in the request
    const user = await User.findOne({ email });

    // if no existing users with the given email address
    if (!user) throw new Error(`cannot find a user with email ${email}`);
    // if we find a user with the given email address
    else {
      // this reset code is for identifying the user in the password-resetting link
      const resetCode = nanoid();

      // store the resetcode in user property
      user.resetCode = resetCode;

      // save the user with the reset code
      user.save();

      // the token for resetting the password
      const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
        expiresIn: "1h",
      });

      // the content of the email
      const content = `
                <p>Please click the link below to access your account:</p>
                <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access my account</a>
            `;
      // send an email to the email in the request body
      config.AWSSES.sendEmail(
        // the options for sending the email
        emailTemplate(email, content, config.REPLY_TO, "Access your account"),

        // handler for success and failure
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ error: err.toString() });
          } else {
            console.log(data);
            return res.json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: err.toString() });
  }
};

/**
 * access the user account by a token for resettin the user password.
 */
export const accessAccount = async (req, res) => {
  try {
    // decode the token and get the resetCode
    const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);

    // find the user in the DB. If found, update this reset code to empty string
    // so that this resetCode become invalid
    const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" });

    // return the use data and updated login token
    return tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: err.toString() });
  }
};

/**
 * require a new login token by the refresh token
 */
export const refreshToken = async (req, res) => {
  try {
    // get the user id from the decoded token
    const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);

    // find the user in db
    const user = await User.findById(_id);

    // if no existing users with the given _id
    if (!user) throw new Error(`cannot find a user with id ${_id}`);

    // return the use data and updated login token
    return tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err.toString() });
  }
};

/**
 * get the current logged-in user
 */
export const currentUser = async (req, res) => {
  try {
    // find the user by id
    const user = await User.findById(req.user._id);

    if (!user) throw new Error(`cannot find a user with id ${user}`);

    // do not disclose the confidential data
    user.password = undefined;
    user.resetCode = undefined;

    // return the user data
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err.toString() });
  }
};

/**
 * expose a user profile (no signin required)
 */
export const publicProfile = async (req, res) => {
  try {
    // find the user by the username
    const user = await User.findOne({ username: req.params.username });

    // if the user not found
    if (!user)
      throw new Error(
        `cannot find a user with username "${req.params.username}"`
      );

    // do not disclose the confidential data
    user.password = undefined;
    user.resetCode = undefined;

    // return the user data
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.toString() });
  }
};

/**
 * udpate user password
 */
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    // if no password is sent by the request
    if (!password) return res.json({ error: "password is required" });

    // is password is too short
    if (password.length < 6)
      return res.json({ error: "password should be of at least 6 characters" });

    // hash the new password
    const newPassword = await hashPassword(password);

    // get the current user and update the password
    const user = await User.findByIdAndUpdate(req.user._id, {
      password: newPassword,
    });

    // indicate the success
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: "something went wrong" });
  }
};

/**
 * update user profiles
 */
export const updateProfile = async (req, res) => {
  try {
    // find the user. "req.user" is added by the middleware "requireSignIn".
    // data that we want to update is in the request body.
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    // do not disclose the confidential data
    user.password = undefined;
    user.resetCode = undefined;

    // return the user data
    res.json(user);
  } catch (err) {
    console.log(err);

    // handle 'DuplicateKey' error
    if (err.codeName == "DuplicateKey") {
      return res.json({ error: "the username or email is taken" });
    } else {
      res.status(40).json({ error: "Invalid or expired token" });
    }
  }
};
