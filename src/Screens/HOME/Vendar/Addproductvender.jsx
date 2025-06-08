import React, { useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Input,
  Paper,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5179/products", product);
      alert("Product added successfully!");
      setProduct({ name: "", description: "", price: "", image: "" });
    } catch (error) {
      alert("Failed to add product");
      console.error(error);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        mt: 6,
        borderRadius: 4,
        background: "#f9f9f9",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <AddBox color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" fontWeight="bold">
          Add New Product
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
        />

        <Input
          type="file"
          onChange={handleImageChange}
          inputProps={{ accept: "image/*" }}
        />

        {product.image && (
          <Card
            sx={{
              mt: 2,
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              maxHeight: 250,
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt="Preview"
              sx={{ objectFit: "cover" }}
            />
          </Card>
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            color: "#fff",
            fontWeight: "bold",
            ":hover": {
              background: "linear-gradient(90deg, #1565c0, #2196f3)",
            },
          }}
        >
          Submit Product
        </Button>
      </Box>
    </Paper>
  );
}

export default AddProduct;
