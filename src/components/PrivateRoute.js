import { Outlet, Navigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export const PrivateRoute = (props) => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  if (authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
};
