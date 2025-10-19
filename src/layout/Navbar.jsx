import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        <NavLink to="/Routines">Routines</NavLink>
        {token ? (
          <a onClick={() => logout()}>Log out</a>
        ) : (
          <>
            <NavLink to="/Register">Register</NavLink>
            <NavLink to="/Login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
