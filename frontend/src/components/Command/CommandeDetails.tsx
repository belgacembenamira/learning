/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 11:19:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommandeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [commandeData, setCommandeData] = useState({
    name_command: '',
    name_user: '',
    numero_tlf_users: '',
    price: 0,
    name_cours: '',
  });

  const [isDeleting, setIsDeleting] = useState(false); // State for deletion status

  useEffect(() => {
    fetchCommande();
  }, []);

  const fetchCommande = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/commandes/${id}`);
      setCommandeData(response.data);
    } catch (error) {
      console.error('Error fetching commande:', error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true); // Set isDeleting to true when deletion starts
    try {
      const response = await axios.delete(`http://localhost:5000/commandes/${id}`);
      console.log('Commande deleted:', response.data);
      navigate('/AllCommande');
    } catch (error) {
      console.error('Error deleting commande:', error);
    } finally {
      setIsDeleting(false); // Set isDeleting back to false when deletion is done
    }
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '1rem',
    backgroundColor: '#f44336',
    color: '#fff',
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Commande Details
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography variant="body1" gutterBottom>
          Name Command: {commandeData.name_command}
        </Typography>
        {/* ... Autres détails de la commande ... */}
        <Button
          variant="contained"
          style={buttonStyle}
          startIcon={
            isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />
          }
          onClick={handleDelete}
        >
          Delete Commande
        </Button>
      </Paper>
    </Container>
  );
};

export default CommandeDetails;
