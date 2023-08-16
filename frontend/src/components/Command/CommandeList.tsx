/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 12:01:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton } from '@mui/material';
import { Edit, Details } from '@mui/icons-material';

interface Commande {
  id: number;
  name_command: string;
  name_user: string;
  numero_tlf_users: string;
  price: number;
  name_cours: string;
  stripeSessionId: string;
}

const CommandeList: React.FC = () => {
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/commandes');
      setCommandes(response.data);
    } catch (error) {
      console.error('Error fetching commandes:', error);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Commande List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Commande Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name Command</TableCell>
              <TableCell>Name User</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commandes.map((commande) => (
              <TableRow key={commande.id}>
                <TableCell>{commande.id}</TableCell>
                <TableCell>{commande.name_command}</TableCell>
                <TableCell>{commande.name_user}</TableCell>
                <TableCell>{commande.price}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/commande/${commande.id}`)}
                    aria-label="Edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/commandes-details/${commande.id}`)}
                    aria-label="Details"
                  >
                    <Details />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommandeList;
