const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

module.exports = function (passport) {
    // In your passport configuration file
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user); // User authenticated successfully
            } catch (err) {
                return done(err);
            }
        }
    ));


    // Serialize user (store user ID in session)
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user (get user data by ID from session)
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
