import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

/**
 *
 * @returns the navigation bar compoennt
 */
export default function Main() {
  // the context
  const { auth, setAuth } = useAuth();
  // hooks
  const navigate = useNavigate();

  // reset the auth context to empty values
  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });

    // remove the localstorage
    localStorage.removeItem("auth");

    // redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between lead">
      <NavLink className="nav-link" aria-current="page" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      <NavLink className="nav-link" to="/Register">
        Register
      </NavLink>

      <div className="dropdown">
        <li>
          <a className="nav-link dropdown-toggle" data-toggle="dropdown">
            User
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
}
