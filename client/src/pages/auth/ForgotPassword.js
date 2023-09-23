import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  // the hooks for states
  const [email, setEmail] = useState("");
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
      const { data } = await axios.post(`/forgot-password`, {
        email,
      });

      // we've got the data. the loading process is terminated now
      setLoading(false);

      if (data?.error) {
        console.log(data.error);
        // send the user an error toast if there is any error
        toast.error(data.error);
      } else {
        // send the success notification
        toast.success("Please check you email to reset your password");
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
      <h1 className="display-1 bg-primary text-light p-5">Forgot password</h1>

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
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>
            <Link className="text-danger" to="/login">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
