/**
 * constrollers handling ads activities, incl. creating, uploading,
 * deleting...
 */
import * as config from "../config.js";
import { Buffer } from "node:buffer";
import { nanoid } from "nanoid";

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
