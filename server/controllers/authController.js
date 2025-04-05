require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { login, password, persist } = req.body;

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
        if (!foundUser) return res.status(401).json({ message: 'User not found.' });

        // Compare passwords
        const pwdMatch = await bcrypt.compare(password, foundUser.password);
        if (!pwdMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        // If successful login, store access token
        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' }
        );

        // If successful login, provide refresh token
        const refreshToken = jwt.sign(
            {
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: persist ? '15d' : '60m' }
        );

        // Save refreshToken with the current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // Remove password before sending back
        const userData = foundUser.toObject();
        delete userData.password;

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: persist ? 15 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
        });
        res.json({
            message: `Welcome back, ${userData.firstName}!`,
            user: {
                id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                email: userData.email,
                role: userData.role,
            },
            accessToken
        });
    }
    catch (err) {
        console.error('Error logging in user: ', err);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    loginUser
}