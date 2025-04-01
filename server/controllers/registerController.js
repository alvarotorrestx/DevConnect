const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email, username, firstName, lastName, password, role } = req.body;

        // Ensure all fields are entered to register
        if (!email || !username || !firstName || !lastName || !password) return res.status(400).json({ "message": "All fields are required to register." });

        // Check if user already exists
        const duplicateUser = await User.findOne({ $or: [{ email }, { username }] });
        if (duplicateUser) return res.status(409).json({ message: "Email or username already in use." });

        // Hash password with bcrypt 10 salt rounds
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            email,
            username,
            firstName,
            lastName,
            password: hashedPassword,
            role
        });

        // Remove password before sending back
        const { password: _, ...userData } = newUser.toObject();

        res.status(201).json(userData);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    registerUser
}