/**
 * the file for react Context used for auth process
 */

import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config.js";

// a global context
const AuthContext = createContext();

/**
 * @param array an array of React components that we provide the context for
 * @returns
 */
const AuthProvider = ({ children }) => {
  // initialize the auth state
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    // check if the "auth" data is stored in the local storage
    let fromLS = localStorage.getItem("auth");

    // update the local auth context if found in local storage
    // this can happen when a window is refreshed and then we get auth data from the local storage
    if (fromLS) setAuth(JSON.parse(fromLS));
  });

  // configure axios. set the base URL
  axios.defaults.baseURL = API;

  // provide the auth context all the children components
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * function that returns the auth context
 * @returns return the context AuthContext
 */
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
