/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 17/08/2023 - 10:31:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField ,Container, Button } from '@mui/material';
import { Box } from '@mui/system';

const LoginAdmin: React.FC = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigte = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/LoginAdmin', {
        mail: mail,
        password: password,
      });

      // If login successful, redirect to dashboard or another page
      // Replace '/dashboard' with your desired destination
      navigte('/AllCommande');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleForgetPassword = () => {
    // Redirect to forget-password page with email as a parameter
    navigte(`/forget-password/`);
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
        Admin Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ marginTop: '1rem' }}
      >
        Login
      </Button>
      <Typography
        variant="body2"
        color="primary"
        onClick={handleForgetPassword}
        sx={{ marginTop: '1rem', cursor: 'pointer', textAlign: 'center' }}
      >
        Forgot Password?
      </Typography>
    </Box>
  </Container>
  );
};

export default LoginAdmin;
