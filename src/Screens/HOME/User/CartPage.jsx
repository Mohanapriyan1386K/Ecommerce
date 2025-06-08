import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Box, Avatar, Grid, Divider, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

const defaultProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality sound with noise cancellation.',
    price: 1200,
    quantity: 1,
    image: 'https://via.placeholder.com/60x60.png?text=Headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected.',
    price: 2500,
    quantity: 1,
    image: 'https://via.placeholder.com/60x60.png?text=Watch'
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    description: 'Ergonomic design with RGB lighting.',
    price: 800,
    quantity: 1,
    image: 'https://via.placeholder.com/60x60.png?text=Mouse'
  }
];

function CartPage() {
  const Navigate =useNavigate()
  const [products, setProducts] = useState(defaultProducts);
  const handlenav =()=>{
         Navigate('/user/payment')
  }

  const handleIncrement = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ));
  };

  // New handler to remove a product from the cart
  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getTotalPrice = (price, quantity) => price * quantity;

  const subtotal = products.reduce(
    (sum, p) => sum + getTotalPrice(p.price, p.quantity),
    0
  );

  const taxRate = 0.1; // 10% tax
  const shippingFee = subtotal > 0 ? 150 : 0;

  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + shippingFee;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} mb={4} color="primary">
        Your Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        {/* Cart Table */}
        <Grid item xs={12} md={8}>
          {products.length === 0 ? (
            <Paper
              elevation={3}
              sx={{
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 4
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 60, color: 'grey.400' }} />
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Typography color="text.secondary">
                Add some products to get started!
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                  <TableRow>
                    <TableCell><Typography fontWeight={600}>Product</Typography></TableCell>
                    <TableCell align="center"><Typography fontWeight={600}>Quantity</Typography></TableCell>
                    <TableCell align="center"><Typography fontWeight={600}>Price</Typography></TableCell>
                    <TableCell align="center"><Typography fontWeight={600}>Total</Typography></TableCell>
                    <TableCell align="center"><Typography fontWeight={600}>Remove</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => (
                    <TableRow
                      key={product.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          cursor: 'pointer',
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            variant="rounded"
                            sx={{ width: 60, height: 60, boxShadow: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{product.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                              {product.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleDecrement(product.id)}
                            aria-label="decrease quantity"
                            sx={{
                              border: '1px solid',
                              borderColor: 'primary.main',
                              '&:hover': { backgroundColor: 'primary.light' },
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            component="span"
                            sx={{
                              width: 32,
                              textAlign: 'center',
                              fontWeight: 600,
                              fontSize: '1rem'
                            }}
                          >
                            {product.quantity}
                          </Typography>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleIncrement(product.id)}
                            aria-label="increase quantity"
                            sx={{
                              border: '1px solid',
                              borderColor: 'primary.main',
                              '&:hover': { backgroundColor: 'primary.light' },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        ₹{product.price}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ₹{getTotalPrice(product.price, product.quantity)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleRemoveProduct(product.id)}
                          aria-label="remove product"
                          sx={{
                            '&:hover': { backgroundColor: 'error.light' },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: '#e3f2fd',
              boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 'fit-content',
              minHeight: 320
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={3} color="primary">
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" color="text.primary">Subtotal</Typography>
              <Typography variant="body1" fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" color="text.primary">Tax (10%)</Typography>
              <Typography variant="body1" fontWeight={600}>₹{taxAmount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1" color="text.primary">Shipping</Typography>
              <Typography variant="body1" fontWeight={600}>₹{shippingFee.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 3, borderColor: 'primary.main' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark">Total</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.dark">₹{total.toFixed(2)}</Typography>
            </Box>
            <Button
              onClick={handlenav}
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 4,
                py: 1.8,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.6)'
                }
              }}
              disabled={subtotal === 0}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage;
