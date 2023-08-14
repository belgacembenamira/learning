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
        <div className="container mt-5">
            <h2>Admin Detail</h2>
            {admin ? (
                <div>
                    <p>Name: {admin.name}</p>
                    <p>Mail: {admin.mail}</p>
                    <p>Tlf: {admin.tlf}</p>
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Admin'}
                    </button>
                </div>
            ) : (
                <p>No admin data available.</p>
            )}
        </div>

    );
};

export default AdminDetail;
