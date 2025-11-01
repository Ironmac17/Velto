// src/components/AuthGuard.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";
import { UserContext } from "../context/UserContext";

const AuthGuard = ({ children }) => {
  useUserAuth(); // runs only inside protected routes
  const { user } = React.useContext(UserContext);

  if (!user) {
    // while not logged in, don't render the dashboard
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
