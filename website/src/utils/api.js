import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const loginUser = (userData) => {
    return axios.post(`${API_URL}/users/login`, userData);
};
export const logOutUser = (userData) => {
    return axios.post(`${API_URL}/users/logout`, userData);
};
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

export const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

export const addTask = async (taskData) => {
    return fetch(`${API_URL}/tasks/task`, { // Adjust the endpoint according to your API
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include token if needed
            'Content-Type': 'application/json',
            'body': JSON.stringify(taskData),
        },
    });
};

// api.js
export const deleteTask = async (taskId) => {
    return fetch(`${API_URL}/tasks/${taskId}`, { // Adjust the endpoint according to your API
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include token if needed
            'Content-Type': 'application/json',
        },
    });
};

