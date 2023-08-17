/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 17/08/2023 - 10:42:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ForgetPasswordAdmin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/forget-password', { mail: email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Admin Password Reset</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Enter Admin Email:
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleResetPassword}>
                Reset Password
            </button>
            {message && <p className="mt-3">{message}</p>}
            <Link to="/loginAdmin" className="btn btn-secondary mt-3">
                Back to Login
            </Link>
        </div>
    );
};

export default ForgetPasswordAdmin;
