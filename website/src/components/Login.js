// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../assets/Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            e.preventDefault();
            const isLoggedIn = await login({ username, password });

            if (isLoggedIn) {
                navigate('/dashboard'); // Navigate only on successful login
            }
        } catch (error) {
            console.error('Login error:', error);
            // Optionally display an error message to the user
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
