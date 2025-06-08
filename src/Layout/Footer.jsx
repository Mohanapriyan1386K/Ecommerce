import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ZEPSO.COM
            </Typography>
            <Typography variant="body2">
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India 
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Link href="#" color="inherit" display="block" underline="hover">
              HOME
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              ABOUT
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              CONTACT
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              HELP
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              HELP
            </Typography>
            <Link href="#" color="inherit" display="block" underline="hover">
              PAYMENT
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              SHIPPING
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              CANCELLATION & RETURNS
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              HELP
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              GROUP COMPANIES
            </Typography>
            <Link href="#" color="inherit" display="block" underline="hover">
              MYNTRA
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              CLEARTRIP
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              SHOPSY
            </Link>
            
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <IconButton href="#" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="#" color="inherit">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>

        {/* Legal Links */}
        <Box mt={4} textAlign="center">
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Terms
          </Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Privacy
          </Link>
          <Typography variant="body2" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} ZEPSO All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
