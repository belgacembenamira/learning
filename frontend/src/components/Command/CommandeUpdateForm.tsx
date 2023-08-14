/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 13:52:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface CommandeUpdateFormProps {
    commandeId: number;
}



const CommandeUpdateForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Retrieve id from URL

    const [commandeData, setCommandeData] = useState({
        name_command: '',
        name_user: '',
        numero_tlf_users: '',
        price: 0,
        name_cours: '',
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCommandeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/commandes/${id}`, commandeData);
            console.log('Commande updated:', response.data);
            // Optionally: Redirect or show success message
        } catch (error) {
            console.error('Error updating commande:', error);
            // Handle error
        }
    }
    return (
        <div className="container">
        <h2>Update Commande</h2>
        <form onSubmit={handleUpdate}>
            <div className="form-group">
                <label>Name Command:</label>
                <input
                    className="form-control"
                    type="text"
                    name="name_command"
                    value={commandeData.name_command}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Name User:</label>
                <input
                    className="form-control"
                    type="text"
                    name="name_user"
                    value={commandeData.name_user}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Numero TLF Users:</label>
                <input
                    className="form-control"
                    type="text"
                    name="numero_tlf_users"
                    value={commandeData.numero_tlf_users}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input
                    className="form-control"
                    type="number"
                    name="price"
                    value={commandeData.price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Name Cours:</label>
                <input
                    className="form-control"
                    type="text"
                    name="name_cours"
                    value={commandeData.name_cours}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button className="btn btn-primary" type="submit">Update Commande</button>
        </form>
    </div>
    );
};

export default CommandeUpdateForm;
