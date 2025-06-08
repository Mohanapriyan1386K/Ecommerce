import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";

function RoleBasedAppbar({ role, darkMode, toggleDarkMode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const navLinksMap = {
    vendor: [
      { label: "Add Product", to: "/Venderdashboard/Addproduct" },
      { label: "Pending Product", to: "/Venderdashboard/Products" },
      { label: "Approved Product", to: "/Venderdashboard/Allproduct" },
      { label: "Logout", to: "#", onClick: handleLogout },
    ],
    user: [
      { label: "Home", to: "/user/home" },
      { label: "Cart", to: "/user/cart" },
      { label: "Contact", to: "/user/contact" },
      { label: "Logout", to: "#", onClick: handleLogout },
    ],
  };

  const navLinks = navLinksMap[role] || [];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <StoreIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                {role === "vendor" ? "Vendor Dashboard" : "User Portal"}
              </Typography>
            </Box>

            {!isMobile &&
              navLinks.map(({ label, to, onClick }) => (
                <Button
                  key={label}
                  component={to !== "#" ? Link : "button"}
                  to={to !== "#" ? to : undefined}
                  onClick={onClick}
                  sx={{
                    color: "white",
                    mx: 1,
                    fontWeight: "bold",
                    ":hover": { backgroundColor: darkMode ? "#7b1fa2" : "#ab47bc" },
                  }}
                >
                  {label}
                </Button>
              ))}

            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {navLinks.map(({ label, to, onClick }) => (
              <ListItem
                button
                key={label}
                component={to !== "#" ? Link : "button"}
                to={to !== "#" ? to : undefined}
                onClick={onClick}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export default RoleBasedAppbar;
