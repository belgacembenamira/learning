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

import { Link } from 'react-router-dom'; 


const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [niveauEducative, setNiveauEducative] = useState('');
  const [register, { isLoading, isError }] = useRegisterMutation();
  const navigte = useNavigate();

  const handleRegister = async () => {
    try {
      const credentials = {
        name: name,
        mail: mail,
        password: password,
        niveau_educative: niveauEducative,
      };
      await register(credentials);
      // alert(`Register successfully'ed ${name}`);
      navigte('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="mail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Group>
        <Form.Group controlId="niveau_educative">
          <Form.Label>Niveau éducatif</Form.Label>
          <Form.Control
            type="text"
            value={niveauEducative}
            onChange={(e) => setNiveauEducative(e.target.value)}
            placeholder="Enter your educational level"
          />



          <div className="mt-3">
            <p className="mb-0 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary fw-bold">
                Login
              </Link>
            </p>
          </div>
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleRegister}
          disabled={isLoading}
          className="w-100"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
        {isError && <p className="text-danger mt-2">Registration failed.</p>}
      </Form>
    </div>

  );
};

export default Register;
