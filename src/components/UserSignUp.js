import { useContext, useRef, useState } from "react";
import { api } from "../utils/apihelper";
import UserContext from "../context/UserContext";
import ErrorDisplay from "./ErrorDisplay";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const nav = useNavigate();
  const [errors, setErrors] = useState([]);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

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
        const user = await actions.signIn({
          username: body.emailAddress,
          password: body.password,
        });
        nav("/");
      } else if (response.status === 400) {
        const validationErrors = await response.json();
        setErrors(validationErrors["Validation Errors"]);
      }
    } catch (error) {
      throw new Error();
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
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />
          <label for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailAddress}
          />
          <label for="password">Password</label>
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
          <a href="sign-in.html">sign in</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

/* 
<main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value="">
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value="">
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="">
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
*/
