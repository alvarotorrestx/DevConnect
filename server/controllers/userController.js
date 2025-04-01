require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -refreshToken');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
}

const createUser = async (req, res) => {
    try {
        const { email, username, firstName, lastName, password, role } = req.body;

        // Ensure all fields are entered to create user
        if (!email || !username || !firstName || !lastName || !password) return res.status(400).json({ "message": "All fields are required to create user." });

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

        // Remove password before sending data back
        const { password: _, ...userData } = newUser.toObject();

        res.status(201).json({
            message: `User ${userData.username} successfully created.`,
            user: userData
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { email, username, firstName, lastName, password, role } = req.body;

        // Ensure all fields are entered to update
        if (!email || !username || !firstName || !lastName) return res.status(400).json({ "message": "All fields are required to update user." });

        // Find user to update
        const foundUser = await User.findOne({ $or: [{ email }, { username }] });
        if (!foundUser) return res.status(404).json({ message: "User not found." });

        // Hash password if updating
        const hashedPassword = password ? await bcrypt.hash(password, 10) : foundUser.password;

        // Update user with new fields
        const updatedUser = await User.findOneAndUpdate(
            { _id: foundUser._id },
            {
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                role: role || foundUser.role
            },
            { new: true } // Returns the updated user
        );

        // Remove password before sending data back
        const { password: _, ...userData } = updatedUser.toObject();

        res.status(200).json({
            message: `User ${userData.username} successfully updated.`,
            user: userData
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "User ID is required." });

        // Find user to delete
        const foundUser = await User.findById(id);
        if (!foundUser) return res.status(404).json({ message: "User not found." });
        
        await foundUser.deleteOne();

        const { password, refreshToken, ...userData } = foundUser.toObject();

        res.status(200).json({
            message: `User ${userData.username} successfully deleted.`,
            user: userData
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete user.' });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}