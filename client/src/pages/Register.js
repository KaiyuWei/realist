import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // the hooks for states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // the state indicating the loading status
  const [loading, setLoading] = useState(false);
  // navigation hook
  const navigate = useNavigate();

  // submission handler
  const handleSubmit = async (e) => {
    try {
      // prevent from auto-reloading ( the default action of submission)
      e.preventDefault();
      // the loading process starts. set the loading state to tru
      setLoading(true);

      // make the post request to the pre-register endpoint
      const { data } = await axios.post(`/pre-register`, {
        email,
        password,
      });

      // we've got the data. the loading process is terminated now
      setLoading(false);

      if (data?.error) {
        // send the user an error toast if there is any error
        toast.error(data.error);
      } else {
        // send the success notification
        toast.success("Please check your email to activate your account!");
        // navigate to home page
        navigate("/");
      }
    } catch (err) {
      // loading process terminated
      setLoading(false);

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
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
