const jwt = require('jsonwebtoken');

function ensureAuthenticated(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Assuming the token contains user data
        next();
    });
}

module.exports = ensureAuthenticated;
