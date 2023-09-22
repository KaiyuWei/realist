import { useState } from "react";
import axios from "axios";
import { API } from "../config.js";
import toast from "react-hot-toast";

export default function Register() {
  // the hooks for states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // submission handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // make the post request to the pre-register endpoint
      const { data } = await axios.post(`${API}/pre-register`, {
        email,
        password,
      });

      // send the user a toast if there is any error
      if (data?.error) {
        toast.error(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary col-12 mb-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
