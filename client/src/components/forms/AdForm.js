/**
 * a component of form that allows users to create an ad
 */

import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config.js";

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
      <div className="mb-3 form-control">
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions="nl"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address...",
            onChange: (data) => console.log(data),
          }}
        />
      </div>
    </>
  );
}
