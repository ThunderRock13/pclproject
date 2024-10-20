import React, { useState } from 'react';
import { registerUser } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Register.css'; // Import CSS for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [specialPhrase, setSpecialPhrase] = useState(''); // State for special phrase
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the special phrase along with username and password
            await registerUser({ username, password, specialPhrase });
            navigate('/login'); // Redirect to login upon successful registration
        } catch (err) {
            alert(err.response.data.message || 'Error during registration');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-wrapper">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Special Phrase: </label>
                        <input
                            type="text"
                            value={specialPhrase}
                            onChange={(e) => setSpecialPhrase(e.target.value)}
                            required
                        />
                    </div>
                    {/* Button container */}
                    <div className="button-group">
                        <button className="register-btn" type="submit">Register</button>
                        <Link to="/login" className="login-btn">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
