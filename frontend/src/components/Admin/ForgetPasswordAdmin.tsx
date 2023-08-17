/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 17/08/2023 - 10:42:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ForgetPasswordAdmin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/forget-password', { mail: email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Admin Password Reset
          </Typography>
          <TextField
            label="Enter Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            fullWidth
            sx={{ marginTop: '1rem' }}
          >
            Reset Password
          </Button>
          {message && (
          <Typography variant="body1" sx={{ marginTop: '1rem' }}>
            {message}
          </Typography>
        )}
        <Link to="/loginAdmin">
          <Typography variant="body1" sx={{ marginTop: '1rem' }}>
            Back to Login
          </Typography>
        </Link>
        </Box>
      </Container>
    );
};

export default ForgetPasswordAdmin;
