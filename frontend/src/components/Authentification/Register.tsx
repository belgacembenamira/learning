/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 09/08/2023 - 15:33:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRegisterMutation } from '../../api/index';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [mail, setmail] = useState(''); // Corrected variable name to "mail"
  const [password, setPassword] = useState('');
  const [niveauEducative, setNiveauEducative] = useState('');
  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      const credentials = {
        name: name,
        mail: mail,  
        password: password,
        niveau_educative: niveauEducative,
      };
      await register(credentials);
    //   alert(`Register successfully'ed ${name}`);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="mail">
          <Form.Label>mail</Form.Label>
          <Form.Control
            type="mail"
            value={mail}
            onChange={(e) => setmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="niveau_educative">
          <Form.Label>Niveau éducatif</Form.Label>
          <Form.Control
            type="text"
            value={niveauEducative}
            onChange={(e) => setNiveauEducative(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleRegister} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
        {isError && <p className="text-danger">Registration failed.</p>}
      </Form>
    </div>
  );
};

export default Register;
