/* eslint-disable react-hooks/rules-of-hooks */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 13:28:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { TextField, Typography, Paper, Grid } from '@mui/material';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const CommandeForm: React.FC = () => {
  const [commandeData, setCommandeData] = useState({
    name_command: '',
    name_user: '',
    numero_tlf_users: '',
    price: 0,
    name_cours: '',
  });
  const { coursName } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommandeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/commandes/', {
        ...commandeData,
        name_cours: coursName,
      });
      console.log('Commande created:', response.data);
      // navigate('/AllCommande')
    } catch (error) {
      console.error('Error creating commande:', error);
      // Handle error
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Commande
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name Cours"
                name="name_cours"
                value={coursName}
                disabled // Empêche la modification de la valeur
                variant="outlined"
                style={{ marginTop: '1rem' }}
              />

            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name User"
                name="name_user"
                value={commandeData.name_user}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Numero TLF Users"
                name="numero_tlf_users"
                value={commandeData.numero_tlf_users}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={commandeData.price}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Name Cours"
            name="name_cours"
            value={commandeData.name_cours}
            onChange={handleInputChange}
            required
            variant="outlined"
            style={{ marginTop: '1rem' }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: '1rem', backgroundColor: '#4CAF50', color: 'white' }} // Green color and centered style
          >
            Create Commande
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default CommandeForm;


