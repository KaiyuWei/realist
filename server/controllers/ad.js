/**
 * constrollers handling ads activities, incl. creating, uploading,
 * deleting...
 */
import * as config from "../config.js";
import { Buffer } from "node:buffer";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Ad from "../models/ad.js";
import User from "../models/user.js";

export const uploadImage = async (req, res) => {
  try {
    // get the image data
    const { image } = req.body;
    // remove the prefix metadata from the image
    // then encode the image to text format by base64
    const base64Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // get the image type info
    const type = image.split(";")[0].split("/")[1];

    // image params for uploading to AWS S3
    const params = {
      Bucket: "realist-kaiyu",
      Key: `${nanoid()}.${type}`,
      Body: base64Image,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload the image
    config.AWSS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Image uploading failed" });
  }
};

/**
 * remove an uploaded image
 */
export const removeImage = async (req, res) => {
  try {
    const { Key, Bucket } = req.body;

    config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * create an ad
 */
export const create = async (req, res) => {
  try {
    // console.log(req.body);
    // destruct the data
    const { photos, description, title, address, price, type, landsize } =
      req.body;
    // do checks about the data integrity
    if (!photos?.length) {
      return res.json({ error: "At least one photo is required" });
    }
    if (!description) {
      return res.json({ error: "description is required" });
    }
    if (!address) {
      return res.json({ error: "address is required" });
    }
    if (!price) {
      return res.json({ error: "price is required" });
    }
    if (!type) {
      return res.json({
        error: "type is required. Is it a property or land?",
      });
    }

    // get the latitude and the longitude of the location
    // the result is an array
    const geo = await config.GOOGLE_GEOCODER.geocode(address);

    // create a new ad and save it in mongoDB
    const ad = await new Ad({
      ...req.body,
      postedBy: req.user._id,
      location: {
        type: "Point",
        coordinates: [geo?.[0].longitude, geo?.[0].latitude],
      },
      googleMap: geo,
    }).save();

    // a user becomes a seller when they posts an ad
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        // add "Seller" into the array of role if its not there yet by mongoDB update operator "$addToSet"
        $addToSet: { role: "Seller" },
      },
      // the document will be sent back after the above update
      { new: true }
    );

    // cover the sensitive data
    user.password = undefined;
    user.resetCode = undefined;

    // response
    res.json({
      ad,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "something went wrong, try again" });
  }
};
