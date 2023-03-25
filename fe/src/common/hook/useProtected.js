import React from "react";
import { getLoggedInUser } from "../../auth/auth.service";
import { Navigate } from "react-router-dom";
function useProtected({ children }) {
  const token = getLoggedInUser();
  console.log("token :: ", token);

  return token ? <Navigate to="/auth/login" /> : children;
}

export default useProtected;
