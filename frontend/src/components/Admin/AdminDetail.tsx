/* eslint-disable react-hooks/rules-of-hooks */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 12:01:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAdminByIdQuery, useDeleteAdminMutation } from '../../api/adminApi';
import { Button, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

const AdminDetail: React.FC = () => {
    const { id } = useParams<{ id?: string }>();

    // Vérifier si l'ID est défini et le convertir en nombre entier
    const adminId = id ? parseInt(id, 10) : undefined;
;
const { data: admin, error, isLoading } = adminId !== undefined ? useGetAdminByIdQuery(adminId) : { data: null, error: null, isLoading: false };

    const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

    const handleDelete = async (): Promise<void> => {
        try {
            // Handle successful deletion, redirect, or show a success message
            if (adminId !== undefined) {
                await deleteAdmin(adminId).unwrap();
                // Handle successful deletion, redirect, or show a success message
            }
        } catch (error) {
            // Handle error
            console.error('Error deleting admin:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !admin) {
        console.log(error);
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '5rem', textAlign: 'center' }}>

        <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <h1> { "Welcome to      "+ admin?.name + " Details  "}</h1>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{admin?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mail</TableCell>
            <TableCell>{admin?.mail}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>tlf</TableCell>
            <TableCell>{admin?.tlf}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                disabled={isDeleting}
                startIcon={
                  isDeleting ? <CircularProgress size={20} /> : <Delete />
                }
              >
                {isDeleting ? 'Deleting...' : 'Delete Admin'}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Container>

    );
};

export default AdminDetail;
