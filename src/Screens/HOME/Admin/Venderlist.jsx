import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Venderlist_compnent from "../../../Components/Venderlist_compnent";

function Venderlist() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const Logout = () => {
    localStorage.removeItem("userRole");
    navigate("/Adminlogin");
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ p: 2, mt: { xs: 8, md: 2 } }}>
            <Venderlist_compnent />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Venderlist;
