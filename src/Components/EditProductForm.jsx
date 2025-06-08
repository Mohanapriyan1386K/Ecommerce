// src/Components/Vendor/EditProductForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated product to parent
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>Edit Product</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          margin="normal"
          value={formData.image}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">Update</Button>
          <Button onClick={onCancel} variant="outlined" color="error">Cancel</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditProductForm;
