import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

const ProductCard = ({ product }) => (
  <Card sx={{ maxWidth: 300, m: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={product.image}
      alt={product.name}
    />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
      <Typography variant="subtitle1" color="text.primary">
        ₹{product.price}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained">Buy Now</Button>
    </CardActions>
  </Card>
);

export default ProductCard;
