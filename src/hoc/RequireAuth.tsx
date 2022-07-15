import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { LocationType } from "../types/types";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth: React.FC<any> = ({ children }) => {
  const location: LocationType = useLocation();
  const isAuth = useAppSelector((state: any) => state.users.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
