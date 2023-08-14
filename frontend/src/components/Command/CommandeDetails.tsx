/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 14:09:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CommandeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Retrieve id from URL
    const navigate = useNavigate(); // Rename 'navigte' to 'navigate'

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

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/commandes/${id}`);
            console.log('Commande deleted:', response.data);
            // Optionally: Redirect or show success message
            navigate('/AllCommande'); // Use the 'navigate' function
        } catch (error) {
            console.error('Error deleting commande:', error);
            // Handle error
        }
    };

    return (
        <div className="container">
            <h2>Commande Details</h2>
            <p>Name Command: {commandeData.name_command}</p>
            <p>Name User: {commandeData.name_user}</p>
            <p>Numero TLF Users: {commandeData.numero_tlf_users}</p>
            <p>Price: {commandeData.price}</p>
            <p>Name Cours: {commandeData.name_cours}</p>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Commande</button>
        </div>
    );
};

export default CommandeDetails;
