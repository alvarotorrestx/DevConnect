const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { viewProfile, updateProfile } = require('../controllers/profileController');

router.route('/:username')
    .get(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), viewProfile)

router.route('/:username/edit')
    .put(verifyJWT, verifyRoles('user', 'admin', 'owner'), updateProfile)

module.exports = router;