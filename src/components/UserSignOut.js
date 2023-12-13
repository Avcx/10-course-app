import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

/**
 * UserSignOut - signs the current user out and redirects them to the index.
 *
 * @returns Navigate component that returns the user to the index route.
 */

const UserSignOut = () => {
  const { actions } = useContext(UserContext);
  useEffect(() => {
    actions.signOut();
  });
  return <Navigate to="/" replace />;
};

export default UserSignOut;
