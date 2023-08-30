/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 10:55:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, TextField, CircularProgress, Container, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';


const LoginProef: React.FC = () => {
  const [credentials, setCredentials] = useState({
    mail: '',
    password: '',
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // Call your login API using Axios
      const response = await axios.post('http://localhost:5000/loginProef', {
        mail: credentials.mail,
        password: credentials.password,
      });

      console.log('Login successful:', response.data.message);
      // You can add further navigation or UI changes here upon successful login
      navigate('/Proef'); // Redirect to dashboard or desired page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle errors or show error messages to the user
    }

    setIsLoggingIn(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '5rem' }} className='mb-2'>
      <div className="login-form">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="mail"
                value={credentials.mail}
                onChange={handleInputChange}
                required
                variant="outlined"
                className="input-field"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                variant="outlined"
                className="input-field"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoggingIn}
            className="login-button"
          >
            {isLoggingIn ? <CircularProgress size={20} /> : 'Login'}
          </Button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/registerProef">Register here</Link>.
        </p>
      </div>
    </Container>
  );
};

export default LoginProef;
