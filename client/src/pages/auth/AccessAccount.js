/**
 * users can get access to their account by a link in the email in case
 * they forget their passwords
 * this component sends a post request with the token retrieved from the link
 * to the '/api/access-account' endpoint
 */

import { useEffect } from "react";
import { useNavigate, useParams, usenavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth.js";

export default function AccessAccount() {
  // we need the global auth context
  const { auth, setAuth } = useAuth();

  // get the token from the params in the routing URL
  const { token } = useParams();

  // the navigator
  const navigate = useNavigate();

  // send the token to the backend after on rendering
  useEffect(() => {
    // call the function that sends the token
    if (token) requestAccess();
  }, [token]);

  const requestAccess = async () => {
    try {
      // get the response from the server
      const { data } = await axios.post(`/access-account`, {
        resetCode: token,
      });

      // if error received
      if (data?.error) {
        toast.error(data.error);
      } else {
        // save the data in local storage (save in json format)
        localStorage.setItem("auth", JSON.stringify(data));
        // set the global auth data
        setAuth(data);
        // send a success toast
        toast.success("Please update your password in profile page");
        // navigate to a new page
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please Wait...
    </div>
  );
}
