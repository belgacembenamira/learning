/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 10:43:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useGetAdminByIdQuery, useUpdateAdminMutation } from '../../api/adminApi';
import { Admin } from '../../api/adminApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

const UpdateAdminForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Utilisez useParams pour obtenir l'ID de l'URL

    const { data: admin, error, isLoading } = useGetAdminByIdQuery(Number(id)); // Convertissez l'ID en nombre
    const [updatedAdmin, setUpdatedAdmin] = useState<Admin | undefined>(admin);

    const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setUpdatedAdmin((prevAdmin) => ({
            ...prevAdmin!,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            await updateAdmin({ id: Number(id), admin: updatedAdmin! }).unwrap();
            // Handle successful update, redirect, or show a success message
        } catch (error) {
            // Handle error
            console.error('Error updating admin:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !updatedAdmin) {
        console.log(error);
    }
    return (
        <div className="container mt-5">
            <h2>Update Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={updatedAdmin?.name || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mail</label>

                    <input
                        type="email"
                        className="form-control"
                        name="mail"
                        value={updatedAdmin?.mail || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>numero_tlf</label>
                    <input
                        type="text"
                        className="form-control"
                        name="numero_tlf"
                        value={updatedAdmin?.tlf || ''}
                        onChange={handleInputChange}
                        required
                    />

                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update Admin'}
                </button>
            </form>
        </div>
    );
};

export default UpdateAdminForm;
