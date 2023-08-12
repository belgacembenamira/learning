/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 11/08/2023 - 21:09:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 11/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/

import React, { useState } from 'react';
import { useLoginMutation } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login: React.FC = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleLogin = async () => {
    try {
      const credentials = { mail, password };
      await login(credentials);

      // Si la connexion réussit, naviguez vers la page souhaitée (par exemple, '/')
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
<div className="w-50 mx-auto mt-5">
      <h2>Login</h2>
      <Form>
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
        <Button
          variant="primary"
          onClick={handleLogin}
          disabled={isLoading}
          className="w-100"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {isError && <p className="text-danger mt-2">Invalid credentials.</p>}
      </Form>
    </div>


  );
};

export default Login;


