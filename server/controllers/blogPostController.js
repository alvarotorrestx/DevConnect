const User = require('../models/User');
const Post = require('../models/Post');
const validator = require('validator');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username firstName lastName avatar') // populate specific author fields
            .sort({ createdAt: -1 }); // sort by newest posts

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving posts." });
    }
}

const createPost = async (req, res) => {
    try {
        const { body, tags = [], featured = false } = req.body;
        const userId = req.user.id;

        if (!body) {
            return res.status(400).json({ message: "Body is required to create post." });
        }

        // Clean tags
        const cleanedTags = tags.map(tag => tag.trim().toLowerCase());

        // Create the post
        const newPost = await Post.create({
            body,
            tags: cleanedTags,
            featured,
            author: userId
        });

        await User.findByIdAndUpdate(userId, {
            $push: { posts: newPost._id }
        });

        res.status(201).json({
            message: `Post successfully created by user ${newPost.author}`,
            post: newPost
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating post." });
    }
}

const updatePost = async (req, res) => {
    try {

    }
    catch (err) {
        res.status(500).json({ message: "Error updating post." });
    }
}

const deletePost = async (req, res) => {
    try {

    }
    catch (err) {
        res.status(500).json({ message: "Error deleting post." });
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}