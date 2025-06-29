const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { getAllUsers, getUserByUsername, createUser, getUserByEmail, updateUser, deleteUser } = require('../controllers/userController');
const { toggleFollowUser, getAllFollowers, getAllFollowing } = require('../controllers/userNetworkController');

// userController routes
router.route('/')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), getAllUsers)
    .post(verifyJWT, verifyRoles('admin', 'owner'), createUser)

router.route('/:id')
    .put(verifyJWT, verifyRoles('admin', 'owner'), updateUser)
    .delete(verifyJWT, verifyRoles('admin', 'owner'), deleteUser)

router.route('/username/:username')
    .get(getUserByUsername);

router.route('/email/:email')
    .get(getUserByEmail);

// userNetworkController routes
router.route('/follow/:id')
    .post(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), toggleFollowUser)
router.route('/followers')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), getAllFollowers)
router.route('/following')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), getAllFollowing)


module.exports = router;