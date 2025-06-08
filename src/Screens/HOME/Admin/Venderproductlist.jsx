import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VenderProuct from "../../../Components/VenderProuct";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Container,
} from "@mui/material";
// import Adduserform from "../../../Components/Adduserform";
import { DataContext } from "../../../Context/DataContext";
function Venderproductlist() {
 

  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
          <VenderProuct />
        </Box>
      </Box>
    </Box>
  );
}

export default Venderproductlist;
