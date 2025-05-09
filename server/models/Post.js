const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true }
}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
    body: { type: String, required: true },
    media: {
        images: [String],
        videos: [String]
    },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: { type: [commentSchema], default: [] },
    repostedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    originalPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },

    shareCount: { type: Number, default: 0 }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
