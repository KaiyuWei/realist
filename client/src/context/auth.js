/**
 * the file for react Context used for auth process
 */

import { useState, createContext, useContext } from "react";
import axios from "axios";
import { API } from "../config.js";

// a glocal context
const AuthContext = createContext();

/**
 *
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

  // configure axios. set the base URL
  axios.defaults.baseURL = API;

  // provide the auth context all the children components
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
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
