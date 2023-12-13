import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Nav = () => {
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      {authUser ? (
        <ul className="header--signedin">
          <li>{`Welcome, ${authUser.firstName} ${authUser.lastName}!`}</li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
        </ul>
      ) : (
        <ul className="header--signedout">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
