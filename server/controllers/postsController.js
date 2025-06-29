const User = require('../models/User');
const Post = require('../models/Post');
const validator = require('validator');

const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
        const skip = (page - 1) * limit;

        // Expected list of followed users
        const userIds = req.query.userIds
            ? req.query.userIds.split(',')
            : [];

        if (!userIds.length) return res.status(400).json({ message: 'No user IDs provided' });

        const totalPosts = await Post.countDocuments({ author: { $in: userIds } });
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find({ author: { $in: userIds } })
            .populate('author', 'username firstName lastName avatar role') // populate specific author fields
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            posts,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username firstName lastName avatar');
        if (!post) return res.status(404).json({ message: 'Post not found.' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving post.' });
    }
};


const createPost = async (req, res) => {

    const WEBSITE_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;

    try {
        const { body, media = { images: [], videos: [] }, tags = [], featured = false } = req.body;
        const userId = req.user.id;

        if (!body) {
            return res.status(400).json({ message: "Body is required to create post." });
        }

        // Helps prevent scripting in post
        // Limits character count to 3000
        const sanitizedBody = validator.escape(body.trim());
        if (sanitizedBody.length > 3000) {
            return res.status(422).json({ message: "Post must be 3,000 characters or less." });
        }

        // Clean tags
        const cleanedTags = tags.map(tag => tag.startsWith('#') ? tag.slice(1).trim().toLowerCase() : tag.trim().toLowerCase());

        if (!Array.isArray(media.images) || !Array.isArray(media.videos)) return res.status(422).json({ message: "Media must include arrays for images and videos." });

        for (const url of [...media.images, ...media.videos]) {
            if (url.trim() !== '' && !WEBSITE_REGEX.test(url)) {
                return res.status(422).json({ message: `Invalid media URL: ${url}` });
            }
        }

        // Create the post
        const newPost = await Post.create({
            body: sanitizedBody,
            tags: cleanedTags,
            media,
            featured,
            author: userId
        });

        await User.findByIdAndUpdate(userId, {
            $push: { posts: newPost._id }
        });

        res.status(201).json({
            message: `Post successfully created by user id: ${newPost.author}`,
            post: newPost
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating post." });
    }
}

const updatePost = async (req, res) => {

    const WEBSITE_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;

    try {
        const postId = req.params.id
        const userRole = req.user.role;
        const userId = req.user.id;

        const foundPost = await Post.findById(postId);
        if (!foundPost) return res.status(404).json({ message: "Post not found." });

        // Restrict edit access unless it's your own post or you are an moderator, admin, owner
        if (foundPost.author.toString() !== userId && !['moderator', 'admin', 'owner'].includes(userRole)) return res.status(403).json({ message: "You are not authorized to edit this post." });

        const { body, media, tags, featured } = req.body;

        const allowedUpdates = ['body', 'media', 'tags', 'featured'];
        const hasValidUpdate = allowedUpdates.some(field => req.body[field] !== undefined);
        if (!hasValidUpdate) return res.status(400).json({ message: "At least one valid field must be changed to update the post." });

        // Helps prevent scripting in post
        // Limits character count to 3000
        const sanitizedBody = body ? validator.escape(body.trim()) : foundPost.body;
        if (sanitizedBody.length > 3000) {
            return res.status(422).json({ message: "Post must be 3,000 characters or less." });
        }

        // Clean tags
        const cleanedTags = tags
            ? tags.map(tag => tag.startsWith('#') ? tag.slice(1).trim().toLowerCase() : tag.trim().toLowerCase())
            : foundPost.tags;


        if (featured !== undefined && typeof featured !== "boolean") return res.status(422).json({ message: "Featured must be a boolean." });

        if (!Array.isArray(media.images) || !Array.isArray(media.videos)) return res.status(422).json({ message: "Media must include arrays for images and videos." });

        // Update user with new fields
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                body: sanitizedBody,
                tags: cleanedTags,
                media,
                featured: featured !== undefined ? featured : foundPost.featured
            },
            { new: true }
        );

        res.status(200).json({
            message: `Post successfully updated by user id: ${updatedPost.author}`,
            post: updatedPost
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating post." });
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userRole = req.user.role;
        const userId = req.user.id;

        const foundPost = await Post.findById(postId);
        if (!foundPost) return res.status(404).json({ message: "Post not found." });

        // Restrict delete access unless it's your own post or you are an moderator, admin, owner
        if (foundPost.author.toString() !== userId && !['moderator', 'admin', 'owner'].includes(userRole)) return res.status(403).json({ message: "You are not authorized to delete this post." });

        await foundPost.deleteOne();

        await User.findByIdAndUpdate(userId, {
            $pull: { posts: postId }
        });

        res.status(200).json({
            message: `Post ${postId} successfully deleted.`,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting post." });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}