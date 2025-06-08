import React, { useState } from "react";
import { Box, Typography, useMediaQuery, Paper } from "@mui/material";
import CoustomButton from "../../Components/CoustomButton";
import CoustomTextFiled from "../../Components/CoustomTextFiled";
import { useNavigate } from "react-router-dom";
import usersData from "../../Utility/Userdata.json";
import { imges } from "../../Utility/imges";

function Userlogin() {
  const [usererr, setusererror] = useState("");
  const [passerror, setpasserror] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const Navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const Handlenav = () => {
    const matchedUser = usersData.users.find(
      (user) =>
        user.email === username.trim() && user.password === password.trim()
    );

    if (matchedUser) {
      localStorage.setItem("userRole", matchedUser.role);
      localStorage.setItem("username", matchedUser.username);

      if (matchedUser.role === "vendor")
        Navigate("/Venderdashboard/Addproduct");
      else if (matchedUser.role === "customer") Navigate("/user/home");
      else if (matchedUser.role === "admin") Navigate("/Admindashboard");
      else Navigate("/");
    } else {
      setusererror("*Enter valid email");
      setpasserror("*Enter correct password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${imges.c8})`,
        backgroundSize: "contain",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 0.5 = 50% dark overlay
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: isSmallScreen ? "100%" : 450,
          padding: 4,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "white",
          zIndex:1
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Welcome Back
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Sign in to your account
        </Typography>

        <CoustomTextFiled
          value={username}
          variant="outlined"
          label="Email Address"
          type="email"
          description={usererr}
          onChange={(e) => {
            setusername(e.target.value);
            setusererror("");
            setpasserror("");
          }}
        />
        <CoustomTextFiled
          value={password}
          variant="outlined"
          label="Password"
          type="password"
          description={passerror}
          onChange={(e) => {
            setpassword(e.target.value);
            setusererror("");
            setpasserror("");
          }}
        />

        <Box textAlign="right">
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            Forgot password?
          </Typography>
        </Box>

        <CoustomButton
          Buttonname="LOGIN"
          variant="contained"
          width="100%"
          onClick={Handlenav}
        />

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Don’t have an account?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }}>Register</span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Userlogin;
