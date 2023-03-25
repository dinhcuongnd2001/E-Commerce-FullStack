import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthProtected from "./authProtected";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Page404 from "../pages/Page404";

function StreetRouter() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <AuthProtected>
              <Home />
            </AuthProtected>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default StreetRouter;
