require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;

        // Check if refresh token exists in cookies
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized: No token provided.' });

        const refreshToken = cookies.jwt;

        // Search for user with this refresh token
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) return res.status(403).json({ message: 'Forbidden: Invalid refresh token.' });

        const populatedUser = await User.findById(foundUser._id)
            .populate({
                path: 'notifications',
                options: { sort: { createdAt: -1 }, limit: 10 },
                populate: { path: 'from', select: 'username avatar' }
            })
            .exec();


        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.email !== decoded.email) {
                return res.status(403).json({ message: 'Forbidden: Token mismatch or expired.' });
            }

            // Generate new access token
            const accessToken = jwt.sign(
                {
                    id: foundUser._id,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    username: foundUser.username,
                    email: foundUser.email,
                    role: foundUser.role,
                    avatar: foundUser.avatar,
                    totalPosts: foundUser.posts,
                    following: foundUser.following,
                    followers: foundUser.followers,
                    notifications: populatedUser.notifications
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60m' }
            );

            res.json({
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                username: foundUser.username,
                avatar: foundUser.avatar,
                role: foundUser.role,
                totalPosts: foundUser.posts,
                following: foundUser.following,
                followers: foundUser.followers,
                notifications: populatedUser.notifications,
                accessToken
            });
        });
    } catch (err) {
        console.error('Error refreshing token: ', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    handleRefreshToken
};