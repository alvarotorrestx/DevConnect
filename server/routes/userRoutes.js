const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

router.route('/')
    .get(verifyJWT, verifyRoles('admin', 'owner'), getAllUsers)
    .post(verifyJWT, verifyRoles('admin', 'owner'), createUser)
    .put(verifyJWT, verifyRoles('moderator', 'admin', 'owner'), updateUser)

router.route('/:id')
    .delete(verifyJWT, verifyRoles('admin', 'owner'), deleteUser)

module.exports = router;