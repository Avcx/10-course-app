import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apihelper";
const UserContext = createContext(null);

/**
 * UserProvider supplies 'UserContext' to enclosed components.
 *
 * @param {Components to be provided the 'UserContext' context} props
 * @returns A provider element with the 'authUser' and relevant actions
 */

export const UserProvider = (props) => {
  const cookie = Cookies.get("authorizedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /**
   * signIn - attempts to sign in a user using the supplied credentials
   * returns the user and stores the credentials in the 'authorizedUser' cookie.
   *
   * @param {object} credentials - object containing 'username' and 'password' properties.
   * @returns {object} user on successful sign in attempt
   */
  const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      Cookies.set("authorizedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  /**
   * signOut - signs out of the current user and removes 'authorizedUser' cookie
   */

  const signOut = () => {
    Cookies.remove("authorizedUser");
    setAuthUser(null);
  };

  return (
    <UserContext.Provider value={{ authUser, actions: { signIn, signOut } }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
