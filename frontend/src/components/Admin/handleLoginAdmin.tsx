/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 17/08/2023 - 10:31:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginAdmin: React.FC = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigte = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/LoginAdmin', {
        mail: mail,
        password: password,
      });

      // If login successful, redirect to dashboard or another page
      // Replace '/dashboard' with your desired destination
      navigte('/AllCommande');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleForgetPassword = () => {
    // Redirect to forget-password page with email as a parameter
    navigte(`/forget-password/`);
  };
  

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <div className="mb-3">
        <label htmlFor="mail" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-2" onClick={handleLogin}>
        Login
      </button>
      <button className="btn btn-secondary" onClick={handleForgetPassword}>
        Forgot Password?
      </button>
    </div>
  );
};

export default LoginAdmin;
