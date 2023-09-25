/**
 * a component of form that allows users to create an ad
 */

import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config.js";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdForm({ action, type }) {
  // the navigator
  const navigate = useNavigate();
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
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });

  /**
   * submitting handler for the ad-creation form
   */
  const handleClick = async () => {
    try {
      // start uploading
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      console.log(data);
      if (data?.error) {
        // loading ends
        setAd({ ...ad, loading: false });
        toast.error(data.error);
      } else {
        // loading ends
        setAd({ ...ad, loading: false });
        toast.success("Ad created successfully!");
        // navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // loading ends
      setAd({ ...ad, loading: false });
      console.log(err);
    }
  };

  return (
    <>
      <div className="mb-3 form-control">
        <ImageUpload ad={ad} setAd={setAd} />
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions="nl"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address...",
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>
      <div style={{ marginTop: "80px" }}>
        <CurrencyInput
          placeholder="Enter price"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
      </div>
      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="Enter how many bedrooms"
        value={ad.bedrooms}
        onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
      />
      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="Enter how many bathrooms"
        value={ad.bathrooms}
        onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
      />
      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="Enter how many car parks"
        value={ad.carpark}
        onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter size of land"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter title"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Enter discription"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />
      <button onClick={handleClick} className="btn btn-primary">
        Submit
      </button>
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
}
