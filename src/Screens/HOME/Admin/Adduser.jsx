import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Container,
} from "@mui/material";
// import Adduserform from "../../../Components/Adduserform";
function Adduser() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("userRole");
    navigate("/Adminlogin");
  };
  return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>      
          {/* Content area */}
          <Box sx={{ p: 3 }}>
            <Adduserform />
          </Box>
        </Box>
      </Box>
  );
}

export default Adduser;
