import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  AppBar,
  Avatar,
} from "@mui/material";
import {
  GroupAdd,
  Store,
  Menu,
  Dashboard,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
  PersonAdd,
  Person,
  ProductionQuantityLimitsRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItemStyle = {
    borderRadius: 2,
    mx: 1,
    my: 0.5,
    "&.active": {
      backgroundColor: "#1976d2",
      color: "#fff",
      "& .MuiListItemIcon-root": {
        color: "#fff",
      },
    },
    "&:hover": {
      backgroundColor: "#e3f2fd",
      color: "black",
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
    },
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar sx={{ justifyContent: "center", mt: 1 }}>
        <Avatar src="/admin-avatar.jpg" alt="Admin" sx={{ width: 56, height: 56 }} />
      </Toolbar>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Admin Panel
        </Typography>
        <Typography variant="caption" color="text.secondary">
          admin@example.com
        </Typography>
      </Box>
      <Divider />
      <List
        subheader={
          <Typography variant="subtitle2" sx={{ pl: 2, pt: 2, color: "gray" }}>
            MAIN
          </Typography>
        }
      >
        <ListItemButton
          component={NavLink}
          to="/Admindashboard"
          sx={navItemStyle}
          onClick={isMobile ? handleDrawerToggle : null}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>

      <Divider />

      {/* User Section */}
      <List
        subheader={
          <Typography variant="subtitle2" sx={{ pl: 2, pt: 2, color: "gray" }}>
            USERS
          </Typography>
        }
      >
        <ListItemButton onClick={() => setOpenUser(!openUser)} sx={{ borderRadius: 2, mx: 1 }}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="User" />
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* <ListItemButton
              component={NavLink}
              to="/Admindashboard/adduser"
              sx={{ ...navItemStyle, pl: 4 }}
              onClick={isMobile ? handleDrawerToggle : null}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItemButton> */}
            <ListItemButton
              component={NavLink}
              to="/Admindashboard/userlist"
              sx={{ ...navItemStyle, pl: 4 }}
              onClick={isMobile ? handleDrawerToggle : null}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="User List" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* Vendor Section */}
      <List
        subheader={
          <Typography variant="subtitle2" sx={{ pl: 2, pt: 2, color: "gray" }}>
            VENDORS
          </Typography>
        }
      >
        <ListItemButton onClick={() => setOpenVendor(!openVendor)} sx={{ borderRadius: 2, mx: 1 }}>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary="Vendor" />
          {openVendor ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openVendor} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* <ListItemButton
              component={NavLink}
              to="/Admindashboard/addvender"
              sx={{ ...navItemStyle, pl: 4 }}
              onClick={isMobile ? handleDrawerToggle : null}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Add Vendor" />
            </ListItemButton> */}
            <ListItemButton
              component={NavLink}
              to="/Admindashboard/venderlist"
              sx={{ ...navItemStyle, pl: 4 }}
              onClick={isMobile ? handleDrawerToggle : null}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Vendor List" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/Admindashboard/Venderproduct"
              sx={{ ...navItemStyle, pl: 4 }}
              onClick={isMobile ? handleDrawerToggle : null}
            >
              <ListItemIcon>
                <ProductionQuantityLimitsRounded />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#1976d2",
            boxShadow: 3,
          }}
        >
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: isMobile ? 8 : 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
