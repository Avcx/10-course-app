import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorDisplay from "./ErrorDisplay";

const UserSignIn = () => {
  const [errors, setErrors] = useState([]);
  const { actions } = useContext(UserContext);
  const nav = useNavigate();
  const username = useRef(null);
  const password = useRef(null);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let from = "/";
    if (location.state) {
      from = location.state.from;
    }
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        nav(from);
      } else {
        setErrors(["Invalid Sign-In Credentials!"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    nav("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ErrorDisplay errors={errors} />
        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={username}
          />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} />
          <button className="button" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
