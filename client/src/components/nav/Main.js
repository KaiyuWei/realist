import {NavLink} from "react-router-dom";

/**
 * 
 * @returns the navigation bar compoennt
 */
export default function Main() {
    return (
        <nav className="nav">
            <NavLink className="nav-link" aria-current="page" to="/">
                Home
            </NavLink >
            <NavLink className="nav-link" to="/login">
                Login
            </NavLink >
            <NavLink className="nav-link" to="/Register">
                Register
            </NavLink >
        </nav>
    );
}