// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth(); // Get user and loading state

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking
    }

    return user ? element : <Navigate to="/login" />;
};


export default ProtectedRoute;
