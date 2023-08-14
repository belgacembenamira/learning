/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 13:28:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CommandeForm: React.FC = () => {
  const [commandeData, setCommandeData] = useState({
    name_command: '',
    name_user: '',
    numero_tlf_users: '',
    price: 0,
    name_cours: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommandeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/commandes/', commandeData);
      console.log('Commande created:', response.data);
      // Optionally: Redirect or show success message
    } catch (error) {
      console.error('Error creating commande:', error);
      // Handle error
    }
  };

  return (
    <Container>
      <h2>Create Commande</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name Command:</Form.Label>
              <Form.Control
                type="text"
                name="name_command"
                value={commandeData.name_command}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Name User:</Form.Label>
              <Form.Control
                type="text"
                name="name_user"
                value={commandeData.name_user}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Numero TLF Users:</Form.Label>
              <Form.Control
                type="text"
                name="numero_tlf_users"
                value={commandeData.numero_tlf_users}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={commandeData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Name Cours:</Form.Label>
          <Form.Control
            type="text"
            name="name_cours"
            value={commandeData.name_cours}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit">Create Commande</Button>
      </Form>
    </Container>
  );
};

export default CommandeForm;
