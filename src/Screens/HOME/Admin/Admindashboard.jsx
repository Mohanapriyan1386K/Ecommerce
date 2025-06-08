import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Toolbar, AppBar } from "@mui/material";
import { Grid, Card, CardContent } from '@mui/material';
import vnderdata from "../../../Utility/Venderdata.json"
import userdata from "../../../Utility/Userdata.json";
import VenderProduct from "../../../Utility/VendorProduct.json"
import Accepetedproduct from "../../../Utility/AccepetedProduct.json"

function Admindashboard() {
  const navigate = useNavigate();



  const Logout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "70vh",boxShadow:"0 0 10px "  }}>
      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>
            <div style={{ padding: '2rem' }}>

      <Grid container spacing={3}>
        {/* Users Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid' ,width:"200px" }}>
            <CardContent>
              <Typography variant="h6">Total Vendor</Typography>
              <Typography variant="h4">{vnderdata.vender.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid ',boxShadow:"0 0 10px black",width:"200px" }}>
            <CardContent>
              <Typography variant="h6">Total User</Typography>
              <Typography variant="h4">{userdata.users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

           <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid',boxShadow:"0 0 10px black",width:"200px" }}>
            <CardContent>
              <Typography variant="h6">Pending product</Typography>
              <Typography variant="h4">{VenderProduct.products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

           <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid',boxShadow:"0 0 10px black",width:"200px" }}>
            <CardContent>
              <Typography variant="h6">Approved product</Typography>
              <Typography variant="h4">{Accepetedproduct.acceptedproducts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

           <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid ',boxShadow:"0 0 3px black",width:"200px" }}>
            <CardContent>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4">{Accepetedproduct.acceptedproducts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
    </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Admindashboard;
