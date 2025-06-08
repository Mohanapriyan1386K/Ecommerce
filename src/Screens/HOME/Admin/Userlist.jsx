import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Container,
} from "@mui/material";
import Userlist_components from "../../../Components/Userlist_components";

function Userlist() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("userRole");
    navigate("/Adminlogin");
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ p: 2, mt: { xs: 8, md: 2 } }}>
            <Userlist_components />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Userlist;
