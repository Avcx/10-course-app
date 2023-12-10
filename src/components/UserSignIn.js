import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const nav = useNavigate();
  const username = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        nav("/");
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

        <form>
          <label for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={username}
          />
          <label for="password">Password</label>
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
