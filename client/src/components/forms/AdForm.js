/**
 * a component of form that allows users to create an ad
 */

import { useState } from "react";

export default function AdForm({ action, type }) {
  // state
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    type: "",
    title: "",
    description: "",
    loading: false,
  });
  return (
    <>
      <p>This is ad create form</p>
      {action} / {type}
    </>
  );
}
