import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Nav = () => {
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      {authUser ? (
        <ul className="header--signedin">
          <li>Welcome, Joe Smith!</li>
          <li>
            <Link to="/sign-out">Sign Out</Link>
          </li>
        </ul>
      ) : (
        <ul className="header--signedout">
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
