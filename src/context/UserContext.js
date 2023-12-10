import { createContext, useState } from "react";
import { api } from "../utils/apihelper";
const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
      const user = await response.json();
      setAuthUser(user);
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signOut = () => {
    setAuthUser(null);
  };

  return (
    <UserContext.Provider value={{ authUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
