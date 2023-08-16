/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 15:57:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { useGetAllAdminsQuery } from '../../api/adminApi';
import { Edit, Delete } from '@mui/icons-material';

const AdminList: React.FC = () => {
  const { data: admins, error, isLoading } = useGetAllAdminsQuery();
  const navigate = useNavigate(); // Initialize the hook

  const handleCreateAdmin = () => {
    navigate('/create-admin');
  };

  const handleEditAdmin = (id: number) => {
    navigate(`/Admin-update/${id}`);
  };

  const handleViewAdmin = (id: number) => {
    navigate(`/Admin-details/${id}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        <p>Error loading admins</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', background: '#f4f4f4', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        List of Admins
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Mail</TableCell>
            <TableCell>numero_tlf</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins?.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.mail}</TableCell>
              <TableCell>{admin.tlf}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={() => handleEditAdmin(admin.id)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="Delete"
                  onClick={() => handleViewAdmin(admin.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateAdmin}
        style={{ marginTop: '1rem' }}
      >
        Create Admin
      </Button>
    </Container>
  );
};

export default AdminList;
