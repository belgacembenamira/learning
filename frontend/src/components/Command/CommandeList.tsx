/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 13:47:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
interface Commande {
    id: number;
    name_command: string;
    name_user: string;
    numero_tlf_users: string;
    price: number;
    name_cours: string;
    stripeSessionId: string; // Make sure this matches the column name in your database
  }
  
  

const CommandeList: React.FC = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/commandes');
      setCommandes(response.data);
    } catch (error) {
      console.error('Error fetching commandes:', error);
    }
  };

  return (
    <div>
      <h2>Commande List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name Command</th>
            <th>Name User</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande : Commande) => (
            <tr key={commande.id}>
              <td>{commande.name_command}</td>
              <td>{commande.name_user}</td>
              <td>{commande.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CommandeList;
