const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
const passport = require('passport');
const initializePassport = require('./config/passport');
 // Access your environment variables


const ensureAuthenticated = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (e.g., cookies)
}));

// Express body parser
app.use(express.json());

// Express session
app.use(
    session({
        secret: process.env.JWT_SECRET, // Should be an environment variable in production
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize Passport and sessions
initializePassport(passport); // Initialize Passport before using it
app.use(passport.initialize());
app.use(passport.session());

// Define your routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Authenticated dashboard route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
