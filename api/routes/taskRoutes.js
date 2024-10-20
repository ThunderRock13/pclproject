// /routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const jwt = require('jsonwebtoken');

// Get tasks by date
router.get('/', async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    //Token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        try {
            const tasks = await Task.find({ completed: false });
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Server error' });
        }
    })

});

// Add a new task
router.post('/task', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const { name, date } = req.body;

        const newTask = new Task({ name, date: date, completed: false });

        try {
            await newTask.save();
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error adding task:', error);
            res.status(500).json({ message: 'Server error' });
        }
    })
});
router.delete('/:id', async (req, res) => {
    try {
        // Verify the token
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            const taskId = req.params.id;
            const deletedTask = await Task.findByIdAndUpdate(taskId, {completed: true});

            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            return res.status(200).json({ message: 'Task completed successfully' });
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
