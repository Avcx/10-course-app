import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  return (
    <UserContext.Provider value={{ authUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
