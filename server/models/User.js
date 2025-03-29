const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin', 'owner'],
        default: 'user'
    },
    refreshToken: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;