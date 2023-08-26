/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:13:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { Button, Container, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProefForm = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [proefData, setProefData] = useState({
    name: '',
    matricule: '',
    mail: '',
    numero_tlf: '',
  });

  useEffect(() => {
    const fetchProef = async () => {
      try {
        const response = await fetch(`http://localhost:5000/proefs/${id}`);
        const data = await response.json();
        setProefData(data);
      } catch (error) {
        console.error('Error fetching proef:', error);
      }
    };

    fetchProef();
  }, [id]);

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
      const response = await fetch(`http://localhost:5000/proefs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proefData),
      });

      if (response.ok) {
        // Redirect to a success page or update the UI
        history('/proef');
      } else {
        console.error('Error updating proef');
      }
    } catch (error) {
      console.error('Error updating proef:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' ,  textAlign: 'center',}}>
      <h2 style={{ textAlign: 'center' }}>
        Modifier le proef</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          fullWidth
          name="name"
          value={proefData.name}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Matricule"
          fullWidth
          name="matricule"
          value={proefData.matricule}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Mail"
          fullWidth
          name="mail"
          value={proefData.mail}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Numéro de téléphone"
          fullWidth
          name="numero_tlf"
          value={proefData.numero_tlf}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          Enregistrer les modifications
        </Button>

      </form>
    </Container>
  );
};

export default UpdateProefForm;
