/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 20:16:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


import { Admin, useCreateAdminMutation } from '../../api/adminApi';
import { Typography, Grid, TextField, CircularProgress, Container, Button } from '@mui/material';

const CreateAdminForm: React.FC = () => {
  const [newAdmin, setNewAdmin] = useState<Admin>({
    id: 0,
    name: '',
    mail: '',
    tlf: '',
  });

  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();

  const navigate = useNavigate(); // Initialize useHistory

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setNewAdmin((prevAdmin: any) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await createAdmin(newAdmin).unwrap();
      navigate('/Admin'); // Use navigate to navigate

      // Handle successful creation, redirect, or show a success message
    } catch (error) {
      // Handle error
      console.error('Error creating admin:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Create Admin
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mail"
                name="mail"
                value={newAdmin.mail}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="tlf"
                name="tlf"
                value={newAdmin.tlf}
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
            {isCreating ? <CircularProgress size={20} /> : 'Create Admin'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateAdminForm;
