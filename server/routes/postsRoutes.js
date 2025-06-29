const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postsController')

router.route('/')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), getAllPosts)
    .post(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), createPost)

router.route('/:id')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), getPostById)
    .put(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), updatePost)
    .delete(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), deletePost)

module.exports = router;