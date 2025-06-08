import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from '@mui/material';

function Venderlist_component() {
  const [venders, setVenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVenderId, setSelectedVenderId] = useState(null);

  // Add Vendor Dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    username: '',
    email: '',
    password: '',
  });

  const fetchVenders = async () => {
    try {
      const res = await fetch('http://localhost:5178/vender');
      const data = await res.json();
      setVenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenders();
  }, []);

  const handleOpenDialog = (id) => {
    setSelectedVenderId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVenderId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedVenderId) {
      try {
        await fetch(`http://localhost:5178/vender/${selectedVenderId}`, {
          method: 'DELETE',
        });
        fetchVenders();
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
    handleCloseDialog();
  };

  const handleAddVendorOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddVendorClose = () => {
    setAddDialogOpen(false);
    setNewVendor({ username: '', email: '', password: '' });
  };

  const handleAddVendorChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVendorSubmit = async () => {
    const payload = {
      ...newVendor,
      role: 'user', // default role
    };

    try {
      await fetch('http://localhost:5178/vender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      fetchVenders();
      handleAddVendorClose();
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#333">
          Vendor List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddVendorOpen}>
          Add New Vendor
        </Button>
      </Box>

      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : venders.length === 0 ? (
        <Typography align="center">No vendors found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#3f51b5' }}>
                <TableCell sx={{ color: 'white' }}><strong>#</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Avatar</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Username</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Email</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Products Ordered</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venders.map((vender, index) => (
                <TableRow key={vender.id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar sx={{ bgcolor: '#ff9800' }}>
                      {vender.username?.charAt(0).toUpperCase() || '?'}
                    </Avatar>
                  </TableCell>
                  <TableCell>{vender.username}</TableCell>
                  <TableCell>{vender.email}</TableCell>
                  <TableCell>{Math.floor(Math.random() * 10) + 1}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog(vender.id)}
                      sx={{
                        backgroundColor: '#f44336',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#d32f2f' },
                        borderRadius: 2,
                        fontWeight: 'bold',
                        px: 2,
                        py: 1,
                        textTransform: 'capitalize',
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirm Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this vendor? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Vendor Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddVendorClose}>
        <DialogTitle>Add New Vendor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            name="username"
            fullWidth
            variant="outlined"
            value={newVendor.username}
            onChange={handleAddVendorChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={newVendor.email}
            onChange={handleAddVendorChange}
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={newVendor.password}
            onChange={handleAddVendorChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddVendorClose}>Cancel</Button>
          <Button onClick={handleAddVendorSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Venderlist_component;
