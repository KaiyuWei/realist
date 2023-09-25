/**
 * the file that defines models used for auth based on mongoose Schema
 */
import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
  {
    // photos in the ad
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address: { type: String, maxLength: 255, required: true },
    bedrooms: Number,
    bathrooms: Number,
    landsize: Number,
    carpark: Number,
    location: {
      type: {
        type: String,
        enum: ["point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [52.370216, 4.895168], // Amsterdam Latitude and longitude
      },
    },
    title: {
      type: String,
      maxLength: 255,
    },
    // the slug in a URL of this ad
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {},
    postedBy: { type: ObjectId, ref: "User" },
    sold: { type: Boolean, default: false },
    // google map data from Google Geocoding API
    googleMap: {},
    // the type of this ad, for a house or for a land
    type: {
      type: String,
      default: "Other",
    },
    // for selling or renting
    action: {
      type: String,
      default: "Sell",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  // need timestamps
  { timestamps: true }
);

// export the schema with the name "User"
export default model("Ad", schema);
