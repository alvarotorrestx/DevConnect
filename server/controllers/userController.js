const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        res.json({
            "email": req.body.email,
            "username": req.body.username,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "password": req.body.password,
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
}