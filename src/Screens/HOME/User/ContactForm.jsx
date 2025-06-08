import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.message) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", form);
      alert("Thank you! We’ll get in touch soon.");
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Contact Us</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          label="Email Address"
          name="email"
          fullWidth
          margin="normal"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Message"
          name="message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={form.message}
          onChange={handleChange}
          error={Boolean(errors.message)}
          helperText={errors.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Message
        </Button>
      </Box>
    </Paper>
  );
};

export default ContactForm;
