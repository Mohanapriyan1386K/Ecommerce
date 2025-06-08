import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { imges } from '../Utility/imges';

// Sample categories (replace with actual images)
const categories = [
  { label: "Kilos", image:imges.c1},
  { label: "Mobiles", image: imges.c2 },
  { label: "Fashion", image: imges.c3, hasDropdown: true },
  { label: "Electronics", image: imges.c4, hasDropdown: true },
  { label: "Home & Furniture", image: imges.c5, hasDropdown: true },
  { label: "Appliances", image: imges.c6 },
  { label: "Flight Bookings", image:imges.c7 },
];

const CategoryBar = () => {
  return (
    <Box sx={{ px: 2, py: 1, backgroundColor: '#fff' }}>
      <Grid container spacing={8} justifyContent="center">
        {categories.map((cat, i) => (
          <Grid key={i} item xs={4} sm={2} md={1.3} textAlign="center">
            <Box
              component="img"
              src={cat.image}
              alt={cat.label}
              sx={{ width: 64, height: 64, objectFit: 'contain', mb: 1 }}
            />
            <Typography variant="body2" fontWeight="500">
              {cat.label}
              {cat.hasDropdown && (
                <ArrowDropDownIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
              )}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryBar;
