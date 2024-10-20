import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks, addTask, deleteTask, logOutUser } from '../utils/api';
import '../assets/Dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const getTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);

    };

    useEffect(() => {
        getTasks(); // Fetch tasks on initial render
    }, [selectedDate]);

    const handleTaskAdded = async (taskName, dueDateTime) => {
        const taskData = {
            name: taskName,
            date: dueDateTime,
        };

        try {
            const response = await addTask(taskData);
            if (response.status === 201) {
                setMessage('Task added successfully!');
                await getTasks(); // Refresh task list after adding a task
            } else {
                const errorData = await response.json();
                setMessage(`Failed to add task: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error while adding task:', error);
            setMessage('Failed to add task.');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await deleteTask(taskId);
            if (response.ok) {
                setMessage('Task deleted successfully!');
                await getTasks(); // Refresh task list after deleting a task
            } else {
                const errorData = await response.json();
                setMessage(`Failed to delete task: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            setMessage('An error occurred while deleting the task.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logOutUser();
            if (response.ok) {
                setMessage('You have been logged out.');
                navigate('/login');
            } else {
                const errorData = await response.json();
                setMessage(`Logout failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error logging out:', error);
            setMessage('An error occurred while logging out.');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Task Dashboard</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <div className="task-section">
                <TaskForm onTaskAdded={handleTaskAdded} />
                <TaskList tasks={tasks} onDelete={handleDelete} />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Dashboard;
