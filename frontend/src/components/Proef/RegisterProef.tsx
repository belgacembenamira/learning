/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 10:52:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Typography, Grid, TextField, CircularProgress, Container, Button } from '@mui/material';
import axios from 'axios';

const RegisterProef: React.FC = () => {
  const [proef, setProef] = useState({
    name: '',
    mail: '',
    password: '',
  });

  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setProef((prevProef) => ({
      ...prevProef,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Call your registration API using Axios
      const response = await axios.post('http://localhost:5000/registerProef', {
        name: proef.name,
        mail: proef.mail,
        password: proef.password,
      });

      console.log('Registration successful:', response.data.message);
      // You can add further navigation or UI changes here upon successful registration
      navigate('/loginPrpef'); // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle errors or show error messages to the user
    }

    setIsCreating(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={proef.name}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="mail"
                value={proef.mail}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={proef.password}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCreating}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {isCreating ? <CircularProgress size={20} /> : 'Register'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterProef;
