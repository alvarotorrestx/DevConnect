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

        // Helps prevent scripting in post
        // Limits character count to 3000
        const sanitizedBody = validator.escape(body.trim());
        if (sanitizedBody.length > 3000) {
            return res.status(422).json({ message: "Post must be 3,000 characters or less." });
        }

        // Clean tags
        const cleanedTags = tags.map(tag => tag.startsWith('#') ? tag.slice(1).trim().toLowerCase() : tag.trim().toLowerCase());

        // Create the post
        const newPost = await Post.create({
            body: sanitizedBody,
            tags: cleanedTags,
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
    try {
        const postId = req.params.id
        const userRole = req.user.role;
        const userId = req.user.id;

        const foundPost = await Post.findOne({ postId });
        if (!foundPost) return res.status(404).json({ message: "Post not found." });

        // Restrict edit access unless it's your own post or you are an moderator, admin, owner
        if (foundPost.author._id.toString() !== userId && !['moderator', 'admin', 'owner'].includes(userRole)) return res.status(403).json({ message: "You are not authorized to edit this profile." });

        const { body, tags, featured } = req.body;

        const allowedUpdates = ['body', 'tags', 'featured'];
        const hasValidUpdate = allowedUpdates.some(field => req.body[field] !== undefined);
        if (!hasValidUpdate) return res.status(400).json({ message: "At least one valid field must be changed to update the post." });

        if (userRole === 'owner') {
            newRole = role; // Full access
        } else if (userRole === 'admin') {
            if (['user', 'moderator'].includes(role)) {
                newRole = role;
            } else {
                return res.status(403).json({ message: 'Admins can only assign user or moderator roles.' });
            }
        } else {
            // Non-admin/owner trying to set a role
            return res.status(403).json({ message: 'You are not authorized to change roles.' });
        }


        // Update user with new fields
        const updatedUser = await User.findOneAndUpdate(
            { _id: foundPost._id },
            {
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                role: newRole,
                bio: sanitizedBio,
                location,
                skills,
                avatar,
                website,
                github,
                linkedin,
                otherWebsite
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