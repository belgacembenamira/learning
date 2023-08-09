/* eslint-disable react-hooks/rules-of-hooks */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 09/08/2023 - 14:09:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLoginMutation } from '../../api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [mail, setmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate(); // Add useNavigate hook

  const handleLogin = async () => {
    try {
      const credentials = { mail, password };
      await login(credentials);
      
      // If login is successful, navigate to '/'
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="mail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email" // Change type to 'email'
            value={mail}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {isError && <p className="text-danger">Invalid credentials.</p>}
      </Form>
    </div>
  );
};

export default Login;
