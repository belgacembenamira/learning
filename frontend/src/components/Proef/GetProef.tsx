/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 13:57:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

interface Proef {
  id: number;
  name: string;
  matricule: string;
  mail: string;
  numero_tlf: string;
  // Add other properties as needed
}
const buttonStyle = {
  marginTop: '1rem',
  backgroundColor: '#f44336',
  color: '#fff',
};

const buttonHoverStyle = {
  backgroundColor: '#d32f2f',
};

const GetProef: React.FC = () => {
  const { id } = useParams();
  const [proef, setProef] = useState<Proef | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProef = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proefs/${id}`);
        setProef(response.data);
      } catch (error) {
        console.error('Error fetching proef:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProef();
  }, [id]);

  const handleDeleteProef = async () => {
    if (proef) {
      try {
        await axios.delete(`http://localhost:5000/proefs/${proef.id}`);
        notifySuccess(`Le proef "${proef.name}" a été supprimé avec succès`);
        navigate('/proef');
      } catch (error) {
        console.error('Error deleting proef:', error);
        notifyError(`Erreur lors de la suppression du proef "${proef.name}"`);
      }
    }
  };

  const notifySuccess = (message: string) => {
    setSnackbarOpen(true);
    // ... other toast configurations
  };

  const notifyError = (message: string) => {
    setSnackbarOpen(true);
    // ... other toast configurations
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Détails du proef
          </Typography>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : proef ? (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Nom du proef:</strong>
                    </TableCell>
                    <TableCell>{proef.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Matricule:</strong>
                    </TableCell>
                    <TableCell>{proef.matricule}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Mail:</strong>
                    </TableCell>
                    <TableCell>{proef.mail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Numéro de téléphone:</strong>
                    </TableCell>
                    <TableCell>{proef.numero_tlf}</TableCell>
                  </TableRow>
                  {/* Display other properties if needed */}
                </TableBody>
              </Table>
              <Button
  variant="contained"
  color="error"
  style={buttonStyle}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
  }}
  onClick={handleDeleteProef}
>
  Supprimer le proef
</Button>

            </TableContainer>
          ) : (
            <Typography>Proef non trouvé.</Typography>
          )}
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled">
          Opération réussie !
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default GetProef;
