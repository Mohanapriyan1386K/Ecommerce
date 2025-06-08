import React, { useContext, useState } from 'react';
import {
  Card, Box, CardActions, CardContent, Typography,
  Button, Grid, Container, Stack
} from "@mui/material";
import { DataContext } from "../../../Context/DataContext";
import EditProductForm from '../../../Components/EditProductForm';

const Productlist = () => {
  const { Venderadddata, deleteVenderproduct, updateVenderProduct } = useContext(DataContext);
  const [editProductId, setEditProductId] = useState(null);

  const productToEdit = Venderadddata.find(p => p.id === editProductId);

  const handleSave = async (updatedProduct) => {
    await updateVenderProduct(updatedProduct.id, updatedProduct);
    setEditProductId(null); // Close form
  };

  return (
    <Container maxWidth="xl">
      <h1>PENDING Product</h1>
      {editProductId && productToEdit ? (
        <EditProductForm
          product={productToEdit}
          onSave={handleSave}
          onCancel={() => setEditProductId(null)}
        />
      ) : (
        <Grid container spacing={2} padding={2} justifyContent="flex-start">
          {Venderadddata.length > 0 ? (
            Venderadddata.map((product) => (
              <Grid
                item key={product.id}
                sx={{ flex: "0 0 30%", maxWidth: "40%", display: "flex" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxHeight: 420,
                    alignItems: "center",
                    paddingTop: 2,
                  }}
                >
                  <Box sx={{
                    width: 150, height: 180, overflow: "hidden",
                    display: "flex", justifyContent: "center",
                    alignItems: "center", borderRadius: 2
                  }}>
                    <img src={product.image} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "8px" }} />
                  </Box>

                  <CardContent sx={{
                    width: "100%", textAlign: "center",
                    flexGrow: 1, minHeight: 120,
                    display: "flex", flexDirection: "column", justifyContent: "space-between"
                  }}>
                    <Typography variant="h6" noWrap>{product.name}</Typography>
                    <Typography
                      variant="body2" color="text.secondary"
                      sx={{
                        overflow: "hidden", textOverflow: "ellipsis",
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">₹ {product.price}</Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setEditProductId(product.id)}
                      >
                        MODIFY
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => deleteVenderproduct(product.id)}
                      >
                        REMOVE
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              No products found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Productlist;
