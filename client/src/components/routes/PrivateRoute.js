/**
 * send get request to the backend for checking if a user is logged in
 * localstorage is not that reliable because anyone can change the localstorage with random tokens.
 */

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

export default function PrivateRoute() {
  // context
  const { auth, setAuth } = useAuth();
  // if we have the user logged in, the state is set to 'true'.
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // retrieve the user dat from the backend
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  // send the login token to the back end and get the current user
  const getCurrentUser = async () => {
    try {
      // get the use data from the backend with token in the request header
      const { data } = await axios.get("/current-user", {
        headers: {
          Authorization: auth?.token,
        },
      });
      // there is a valid user
      setOk(true);
    } catch (err) {
      // no valid user
      setOk(false);
      console.log(err);
    }
  };

  return ok ? <Outlet /> : "";
}
