// src/PrivateRouter/RoleBasedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Screens/Auth/Userlogin";

const PrivateRoute = ({ children, requiredRole = null, protect = false }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return protect ? <Navigate to="/" replace /> : <Login />;
  }

  if (protect && requiredRole && userRole !== requiredRole) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/Admindashboard" replace />;
      case "vendor":
        return <Navigate to="/Venderdashboard/Addproduct" replace />;
      case "customer":
        return <Navigate to="/user/home" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  if (!protect) {
    if (userRole === "admin") return <Navigate to="/Admindashboard" replace />;
    if (userRole === "vendor") return <Navigate to="/Venderdashboard/Addproduct" replace />;
    if (userRole === "customer") return <Navigate to="/user/home" replace />;
  }

  return children;
};

export default PrivateRoute;
