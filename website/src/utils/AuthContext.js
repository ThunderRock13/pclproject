import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                const response = await fetch(`${API_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setUser(true); // Valid token
                } else {
                    console.error('Invalid token:', await response.text());
                    localStorage.removeItem('authToken');
                    setUser(false); // Invalid token
                }
            } else {
                setUser(false); // No token found
            }
            setLoading(false); // Mark loading as complete
        };

        checkAuthToken();
    }, []);

    const login = async ({ username, password }) => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token); // Store token
            setUser(true); // Set user to true after successful login
            return true; // Indicate successful login
        } catch (error) {
            console.error('Login error:', error);
            return false; // Indicate failed login
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(false); // Clear user state
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
