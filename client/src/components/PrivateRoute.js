import { Outlet, Navigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

/**
 * PrivateRoute - used to protect routes that require user authentication
 *
 * @returns Redirects to route if user is signed in
 */

export const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  // Outlets to route if user is signed in
  // Otherwise redirects to the sign in screen with a state reference to come back after

  if (authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
};
