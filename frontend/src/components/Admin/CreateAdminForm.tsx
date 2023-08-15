/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 15:18:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useCreateAdminMutation } from '../../api/adminApi';

interface Admin {
  id: number;
  name: string;
  mail: string;
  tlf: string;
}

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
    setNewAdmin((prevAdmin) => ({
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
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      <Typography variant="h4" gutterBottom>
        Create Admin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={newAdmin.name}
          onChange={handleInputChange}
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Mail"
          name="mail"
          value={newAdmin.mail}
          onChange={handleInputChange}
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Tlf"
          name="tlf"
          value={newAdmin.tlf}
          onChange={handleInputChange}
          required
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isCreating}
          style={{ marginTop: '1rem' }}
        >
          {isCreating ? <CircularProgress size={20} /> : 'Create Admin'}
        </Button>
      </form>
    </Container>
  );
};

export default CreateAdminForm;

