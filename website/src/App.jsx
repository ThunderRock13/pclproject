// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './utils/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.js'; // Import ProtectedRoute


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
