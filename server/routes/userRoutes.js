const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;