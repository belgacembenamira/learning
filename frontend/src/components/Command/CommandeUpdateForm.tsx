/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 12:11:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
} from '@mui/material';

interface CommandeUpdateFormProps {
    commandeId: number;
}

const CommandeUpdateForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // Use navigate hook here

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
            navigate('/AllCommande'); // Navigate to AllCommande after successful update
        } catch (error) {
            console.error('Error updating commande:', error);
            // Handle error
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Update Commande
            </Typography>
            <form onSubmit={handleUpdate}>
                <TextField
                    fullWidth
                    label="Name Command"
                    name="name_command"
                    value={commandeData.name_command}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Name User"
                    name="name_user"
                    value={commandeData.name_user}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Numero TLF Users"
                    name="numero_tlf_users"
                    value={commandeData.numero_tlf_users}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={commandeData.price}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Name Cours"
                    name="name_cours"
                    value={commandeData.name_cours}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '1rem' }}
                >
                    Update Commande
                </Button>
            </form>

        </Container>
    );
};

export default CommandeUpdateForm;

