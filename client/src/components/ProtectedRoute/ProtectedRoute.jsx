import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
