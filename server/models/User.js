const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // User Fields
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin', 'owner'],
        default: 'user'
    },
    refreshToken: { type: String },

    // Profile fields
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    skills: { type: [String], default: [] },
    avatar: { type: String, default: '' },
    website: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    otherWebsite: { type: String, default: '' },

    // User notifications
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],

    // User following other users
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    // User's followers - other users
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    // User's network - similar to becoming friends or connecting
    network: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    // Posts - Reference to Posts model
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    // Projects - Reference to Projects model
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;