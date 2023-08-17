/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:20:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography , Container, Button } from '@mui/material';

const DeleteProef = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/proefs/${id}`);

      if (response.status === 200) {
        notifySuccess('Le proef a été supprimé avec succès.');
        navigate('/proef'); // Redirect to the proefs list after successful deletion
      } else {
        notifyError('Erreur lors de la suppression du proef.');
      }
    } catch (error) {
      console.error('Error deleting proef:', error);
      notifyError('Erreur lors de la suppression du proef.');
    }
  };

  const notifySuccess = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const notifyError = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' ,  textAlign: 'center',}}>
    <Typography variant="h4" align="center">
      Supprimer le proef
    </Typography>
    <Typography variant="body1" align="center" sx={{ marginBottom: '2rem' }}>
      Êtes-vous sûr de vouloir supprimer ce proef ?
    </Typography>
    <Button
      variant="contained"
      color="error"
      onClick={handleDelete}
      sx={{ marginRight: '1rem' ,  textAlign : 'center' , }}
    >
      Supprimer
    </Button>
    <Button variant="outlined" color="secondary" onClick={() => navigate('/proef')} style={ {textAlign: 'center',}}>
      Annuler
    </Button>
  </Container>
  );
};

export default DeleteProef;
