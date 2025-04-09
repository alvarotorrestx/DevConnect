const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

router.route('/')
    .get(verifyJWT, verifyRoles('user','moderator','admin', 'owner'), getAllUsers)
    .post(verifyJWT, verifyRoles('admin', 'owner'), createUser)

router.route('/:id')
    .put(verifyJWT, verifyRoles('admin', 'owner'), updateUser)
    .delete(verifyJWT, verifyRoles('admin', 'owner'), deleteUser)

module.exports = router;