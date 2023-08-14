/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 11:56:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useCreateAdminMutation } from '../../api/adminApi';
import { Admin } from '../../api/adminApi';

const CreateAdminForm: React.FC = () => {
    const [newAdmin, setNewAdmin] = useState<Admin>({
        id:0,
        name: '',
        mail: '',
        tlf: '',
    });

    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setNewAdmin((prevAdmin) => ({
            ...prevAdmin,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            await createAdmin(newAdmin).unwrap();
            // Handle successful creation, redirect, or show a success message
        } catch (error) {
            // Handle error
            console.error('Error creating admin:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newAdmin.name}
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
                        value={newAdmin.mail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tlf</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tlf"
                        value={newAdmin.tlf}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Admin'}
                </button>
            </form>
        </div>
    );
};

export default CreateAdminForm;
