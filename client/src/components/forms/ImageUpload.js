/**
 * for uploading images for the houses in ads
 */

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      // put all files from the fileList in an array
      files = [...files];

      // if the array is not empty
      if (files?.length) {
        // start uploading
        setAd({ ...ad, uploading: true });

        // resize the images
        files.map((f) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              f,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  // after resizing we send the image to the server
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (err) {
                  console.log(err);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      setAd({ ...ad, uploading: false });
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, uploading: true });
    } catch (err) {
      setAd({ ...ad, uploading: false });
      console.log(err);
    }
  };
  return (
    <>
      <label className="btn btn-secondary mb-4">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {ad?.photos.map((file) => (
        <Avatar src={file?.Location} size="46" className="ml-2 mb-4" />
      ))}
    </>
  );
}
