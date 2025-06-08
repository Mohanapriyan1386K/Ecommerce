import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import headphone from  "../../../assets/img/img1.jpg"
import smartwatch from "../../../assets/img/imge2.jpg"

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const defaultProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: 1200,
    quantity: 2,
    image:headphone,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and stay connected.",
    price: 2500,
    quantity: 1,
    image:smartwatch,
  },
];

export default function Payment() {
  const [activeStep, setActiveStep] = useState(0);

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const subtotal = defaultProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const taxRate = 0.1;
  const shippingFee = subtotal > 0 ? 150 : 0;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + shippingFee;

  function isShippingComplete() {
    return (
      shipping.fullName &&
      shipping.address &&
      shipping.city &&
      shipping.state &&
      shipping.postalCode &&
      shipping.country &&
      shipping.phone
    );
  }

  function isPaymentComplete() {
    return (
      payment.cardName &&
      payment.cardNumber.length === 16 &&
      payment.expiryDate &&
      payment.cvv.length === 3
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "", minHeight: "70vh" }}>
      <Typography variant="h4" fontWeight={700} mb={4} color="primary">
        Checkout
      </Typography>

      <Grid container spacing={2}>
        {/* Payment Section - Wider */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4, width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField required label="Full Name" name="fullName" value={shipping.fullName} onChange={handleShippingChange} />
                <TextField required label="Address" name="address" value={shipping.address} onChange={handleShippingChange} />
                <TextField required label="City" name="city" value={shipping.city} onChange={handleShippingChange} />
                <TextField required label="State/Province" name="state" value={shipping.state} onChange={handleShippingChange} />
                <TextField required label="Postal Code" name="postalCode" value={shipping.postalCode} onChange={handleShippingChange} />
                <TextField required label="Country" name="country" value={shipping.country} onChange={handleShippingChange} />
                <TextField required label="Phone Number" name="phone" value={shipping.phone} onChange={handleShippingChange} />
              </Box>
            )}

            {activeStep === 1 && (
              <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField required label="Name on Card" name="cardName" value={payment.cardName} onChange={handlePaymentChange} />
                <TextField required label="Card Number" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} inputProps={{ maxLength: 16 }} helperText="Enter 16-digit card number" />
                <TextField required label="Expiry Date" name="expiryDate" placeholder="MM/YY" value={payment.expiryDate} onChange={handlePaymentChange} />
                <TextField required label="CVV" name="cvv" value={payment.cvv} onChange={handlePaymentChange} inputProps={{ maxLength: 3 }} helperText="3-digit code on back of card" />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h6" fontWeight={700} color="primary">
                  Shipping Address
                </Typography>
                <Typography>
                  {shipping.fullName}, {shipping.address}, {shipping.city}, {shipping.state}, {shipping.postalCode}, {shipping.country}
                </Typography>
                <Typography>Phone: {shipping.phone}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight={700} color="primary">
                  Payment Details
                </Typography>
                <Typography>Name on Card: {payment.cardName}</Typography>
                <Typography>Card Number: **** **** **** {payment.cardNumber.slice(-4)}</Typography>
                <Typography>Expiry Date: {payment.expiryDate}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight={700} color="primary">
                  Confirm Your Order
                </Typography>
                <Typography>
                  Please review all details before placing your order.
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Back
              </Button>

              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    (activeStep === 0 && !isShippingComplete()) ||
                    (activeStep === 1 && !isPaymentComplete())
                  }
                >
                  Next
                </Button>
              )}

              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => alert("Order placed successfully!")}
                >
                  Place Order
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary - Slightly narrower */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "#e3f2fd",
              boxShadow: "0 8px 24px rgba(25, 118, 210, 0.2)",
              height: "fit-content",
              minHeight: 420,
              width:600,
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={3} color="primary">
              Order Summary
            </Typography>

            <List>
              {defaultProducts.map((product) => (
                <ListItem key={product.id} sx={{ px: 0 }}>
                  <Avatar
                    src={product.image}
                    variant="rounded"
                    sx={{ width: 56, height: 56, mr: 2, boxShadow: 2 }}
                  />
                  <ListItemText
                    primary={`${product.name} × ${product.quantity}`}
                    secondary={`₹${product.price * product.quantity}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2, borderColor: "primary.main" }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body1" color="text.primary">Subtotal</Typography>
              <Typography variant="body1" fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body1" color="text.primary">Tax (10%)</Typography>
              <Typography variant="body1" fontWeight={600}>₹{taxAmount.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="body1" color="text.primary">Shipping</Typography>
              <Typography variant="body1" fontWeight={600}>₹{shippingFee.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ mb: 3, borderColor: "primary.main" }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight={700} color="primary.dark">Total</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.dark">₹{total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
