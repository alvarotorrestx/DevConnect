const User = require('../models/User');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;

        // If no email, username or password is entered
        if (!login || !password) return res.status(400).json({ message: 'Email or Username and Password are required.' });

        // Search for user in the db
        const foundUser = await User.findOne(
            {
                $or: [
                    { email: login },
                    { username: login }
                ]
            }
        );
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized: User not found.' });

        // Compare passwords
        const pwdMatch = await bcrypt.compare(password, foundUser.password);
        if (!pwdMatch) return res.status(401).json({ message: 'Unauthorized: Invalid credentials.' });

        // Remove password before sending back
        const { password: _, ...userData } = foundUser.toObject();

        res.status(200).json({ message: `Welcome back, ${userData.firstName}!`, user: userData });
    }
    catch (err) {
        res.status(401);
    }
}

module.exports = {
    loginUser
}