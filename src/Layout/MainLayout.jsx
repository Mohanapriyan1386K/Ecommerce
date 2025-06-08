import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RoleBasedAppbar from "./RoleBasedAppbar"; // New reusable AppBar

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#9c27b0" : "#6a1b9a",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
    },
  });

  const user = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user === "vendor" ? (
        <>
          <RoleBasedAppbar role="vendor" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Box sx={{ mt: 10, p: 3 }}>
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </Box>
        </>
      ) : user === "admin" ? (
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 2 }}>
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                  Admin Panel
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{ color: "#fff", borderColor: "#fff" }}
                >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <RoleBasedAppbar role="user" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Box sx={{ mt: 10, p: 3 }}>
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </Box>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};

export default MainLayout;
