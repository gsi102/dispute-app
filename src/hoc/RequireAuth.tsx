import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

type RequireAuthType = {
  (props: any): { values: any };
};

const RequireAuth: RequireAuthType = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector((state: any) => state.users.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
