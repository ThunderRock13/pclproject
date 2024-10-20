// /routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ensureAuthenticated = require('../middleware/auth'); // Your auth middleware

router.get('/me', ensureAuthenticated, (req, res) => {
    res.json({ user: req.user }); // Assuming you set req.user in your authentication logic
});

// Registration route
router.post('/register', async (req, res) => {
    const { username, password, specialPhrase } = req.body;

    // Check if the special phrase matches the predefined one
    if (specialPhrase !== "Noah") {
        return res.status(403).json({ message: 'Invalid special phrase' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login route
// routes/userRoutes.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Token expiry time
            });

            return res.status(200).json({
                message: 'Logged in successfully',
                user,
                token, // Send back the token
            });
        });
    })(req, res, next);
});
// Route for Particle registration
router.post('/register-particle', (req, res) => {
    const { secretPhrase } = req.body;

    if (secretPhrase !== process.env.PARTICLE_SECRET) {
        return res.status(403).json({ message: 'Invalid secret phrase' });
    }

    // Create a JWT token for the Particle device
    const token = jwt.sign({ device: 'particle' }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    // Send the token to the Particle
    return res.status(200).json({ message: 'Token created', token });
});
// Logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
