require('dotenv').config();
const User = require('../models/User');

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    // Find user with matching refresh token
    const foundUser = await User.findOne({ refreshToken });
    if (foundUser) {
        // Remove the refresh token from DB
        foundUser.refreshToken = null;
        await foundUser.save();
    }

    // Clear the cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    res.sendStatus(204);
};

module.exports = {
    logoutUser
};
