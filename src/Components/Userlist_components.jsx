import React, { useContext, useState, useEffect } from 'react';
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
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';

function Userlist_components() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Load users from JSON server
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5177/users');
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:5177/users/${selectedUserId}`, {
        method: 'DELETE',
      });
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Delete failed:', err);
    }
    handleCloseDialog();
  };

  const handleAddUserOpen = () => setOpenAddUserDialog(true);
  const handleAddUserClose = () => {
    setOpenAddUserDialog(false);
    setNewUsername('');
    setNewEmail('');
    setNewPassword('');
  };

  const handleAddUserSubmit = async () => {
    if (newUsername && newEmail && newPassword) {
      const newUser = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        role: 'customer', // Default role
      };

      try {
        await fetch('http://localhost:5177/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        fetchUsers(); // Refresh the list
        handleAddUserClose();
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
              User List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUserOpen}
              sx={{ borderRadius: 2, textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              Add User
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#3f51b5' }}>
                  <TableCell sx={{ color: 'white' }}><strong>#</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Avatar</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Username</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Email</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Role</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Products Ordered</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar sx={{ bgcolor: '#ff5722' }}>
                        {user.username?.charAt(0).toUpperCase() || '?'}
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role || 'user'}</TableCell>
                    <TableCell>{Math.floor(Math.random() * 10) + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenDialog(user.id)}
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

          {/* Delete Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this user? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error" variant="contained">Confirm</Button>
            </DialogActions>
          </Dialog>

          {/* Add User Dialog */}
          <Dialog open={openAddUserDialog} onClose={handleAddUserClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                fullWidth
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddUserClose}>Cancel</Button>
              <Button onClick={handleAddUserSubmit} variant="contained" color="primary">
                Add User
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

export default Userlist_components;
