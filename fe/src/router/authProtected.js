import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../auth/auth.service";
function AuthProtected({ children }) {
  const token = getLoggedInUser();
  return token ? children : <Navigate to="/auth/login" />;
}

export default AuthProtected;
