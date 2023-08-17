/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 08:58:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, Delete, Edit } from '@mui/icons-material';
import { Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@mui/material';
import { Container, Table, Button } from 'react-bootstrap';


interface Proef {
  id: number;
  name: string;
  matricule: string;
  mail: string;
  numero_tlf: string;
  // Add more properties if needed
}

const GetAllProef: React.FC = () => {
  const [proefs, setProefs] = useState<Proef[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const navigate = useNavigate();;

  useEffect(() => {
    const fetchProefs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/proefs/');
        setProefs(response.data);
      } catch (error) {
        console.error('Error fetching proefs:', error);
      }
    };

    fetchProefs();
  }, []);

  const handleViewProef = (proef: Proef) => {
    notifySuccess(`Voir le proef "${proef.name}"`);
    navigate(`/proef-details/${proef.id}`);
  };

  const handleDeleteProef = (proef: Proef) => {
    console.log('Supprimer le proef', proef.name);
    notifyInfo(`Supprimer le proef "${proef.name}"`);
    navigate(`/delete-proef/${proef.id}`);
  };

  const handleEditProef = (proef: Proef) => {
    notifyInfo(`Modifier le proef "${proef.name}"`);
    navigate(`/edit-proef/${proef.id}`);
  };

  const handleCreateProef = () => {
    notifyInfo("Créer un proef");
    navigate('/create-proef');
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const notifyInfo = (message: string) => {
    toast.info(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
    setSearchQuery(searchTerm);
  };

  const filteredProefs = proefs.filter((proef) => {
    return (
      proef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proef.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proef.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proef.numero_tlf.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (

    <div>
      <ToastContainer />
      <Container>
        <h1 style={ {textAlign: 'center'}}>Liste des proefs</h1>

        <TextField
          label="Rechercher"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: '1rem' }}
        />
        <TableContainer>
          <Table>
            <TableHead>

              <TableRow>
                <TableCell>Nom du proef</TableCell>
                <TableCell>Matricule</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Numéro de téléphone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProefs.map((proef) => (
                <TableRow key={proef.id}>
                  <TableCell>{proef.name}</TableCell>
                  <TableCell>{proef.matricule}</TableCell>
                  <TableCell>{proef.mail}</TableCell>
                  <TableCell>{proef.numero_tlf}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewProef(proef)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteProef(proef)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => handleEditProef(proef)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="text-center mt-3">

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProef}
            style={{
              marginTop: '1rem',
              backgroundColor: '#007bff', // Custom primary color
              color: '#fff', // Text color
              borderRadius: '4px', // Rounded corners
              fontWeight: 'bold', // Bold text
              letterSpacing: '0.5px', // Increased letter spacing
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
              transition: 'background-color 0.3s ease', // Smooth hover transition
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3'; // Darker color on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff'; // Restore original color
            }}
          >
            Créer un proef
          </Button>
        </div>





      </Container>
    </div>

  );
};

export default GetAllProef;


