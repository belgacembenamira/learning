/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:07:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { CardContent, TextField, Container, Card, Button } from '@mui/material';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreateProefForm = () => {
  const [proefData, setProefData] = useState({
    name: '',
    matricule: '',
    mail: '',
    numero_tlf: '',
  });

  const navigte = useNavigate();

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setProefData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/proefs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proefData),
      });

      if (response.ok) {
        // Redirect to a success page or update the UI
        navigte('/proef');
      } else {
        console.error('Error creating proef');
      }
    } catch (error) {
      console.error('Error creating proef:', error);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #f0f4f8, #e1e6ea)' }}>
    <Container maxWidth="md" style={{ paddingTop: '2rem' }}>
      <Card>
        <CardContent>
          <h2 style={{ marginBottom: '1rem' }}>Créer un proef</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nom"
              name="name"
              value={proefData.name}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Matricule"
              name="matricule"
              value={proefData.matricule}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mail"
              name="mail"
              value={proefData.mail}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Numéro de téléphone"
              name="numero_tlf"
              value={proefData.numero_tlf}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Créer Proef
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  </div>


  );
};

export default CreateProefForm;
