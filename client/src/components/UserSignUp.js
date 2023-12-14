import { useContext, useRef, useState } from "react";
import { api } from "../utils/apihelper";
import UserContext from "../context/UserContext";
import ErrorDisplay from "./ErrorDisplay";
import { useNavigate } from "react-router-dom";

/**
 * UserSignUp - shows a form allowing the user to create a new account in the database.
 *
 * @returns (JSX Component) - User Sign Up Form.
 */

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const nav = useNavigate();
  const [errors, setErrors] = useState([]);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  // handleSubmit sends a POST request with the information in the form to create a new user.

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const response = await api("/users", "POST", body);
      if (response.status === 201) {
        // Success
        // Signs newly created user in
        await actions.signIn({
          username: body.emailAddress,
          password: body.password,
        });
        nav("/");
      } else if (response.status === 400) {
        const validationErrors = await response.json();
        setErrors(validationErrors["Validation Errors"]);
      }
    } catch (error) {
      console.error("/error");
      nav("/error");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    nav("/");
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <ErrorDisplay errors={errors} />
        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} />
          <button className="button" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <a href="/signin">sign in</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
