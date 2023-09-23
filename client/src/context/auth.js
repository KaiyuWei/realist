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

  // this makes the app stays in logged-in state
  useEffect(() => {
    // check if the "auth" data is stored in the local storage
    let fromLS = localStorage.getItem("auth");

    // update the local auth context if found in local storage and the auth state is still empty
    // this can happen when a window is refreshed and then we get auth data from the local storage
    if (fromLS && !auth?.user) setAuth(JSON.parse(fromLS));
  });

  // configure axios. set the base URL
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;

  // handle the token expiry issue before it is passed to `catch`
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const { data } = await axios.get("/refresh-token");
            axios.defaults.headers.common["token"] = data.token;
            axios.defaults.headers.common["refresh_token"] = data.refreshToken;

            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));

            return axios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );

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
