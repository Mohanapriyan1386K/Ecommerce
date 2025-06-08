import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function VenderProuct() {
  const {
    Venderadddata,
    deleteVenderproduct,
    fetchVenderProducts,
    acceptVenderProduct,
  } = useContext(DataContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // "accept" or "reject"
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchVenderProducts();
  }, [fetchVenderProducts]);

  const handleOpenDialog = (action, product) => {
    setSelectedAction(action);
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAction(null);
    setSelectedProduct(null);
  };

  const handleConfirm = () => {
    if (selectedAction === "accept") {
      acceptVenderProduct(selectedProduct);
    } else if (selectedAction === "reject") {
      deleteVenderproduct(selectedProduct.id);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Grid container spacing={5} padding={2}>
        {Venderadddata && Venderadddata.length > 0 ? (
          Venderadddata.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 280,
                  width: "100%",
                  maxHeight: 420,
                  alignItems: "center",
                  paddingTop: 2,
                }}
              >
                <Box
                  sx={{
                    width: 250,
                    height: 180,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "300px",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                        display: "block",
                      }}
                    />
                  )}
                </Box>

                <CardContent
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    flexGrow: 1,
                    minHeight: 120,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    ₹ {product.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenDialog("accept", product)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog("reject", product)}
                    >
                      Reject
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

      {/* ✅ Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedAction === "accept"
            ? "Confirm Accept Product"
            : "Confirm Reject Product"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to{" "}
            <strong>{selectedAction === "accept" ? "accept" : "reject"}</strong>{" "}
            this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={selectedAction === "accept" ? "success" : "error"}
          >
            Yes, {selectedAction === "accept" ? "Accept" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VenderProuct;
