const express = require('express');
const { viewProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

router.route('/:username')
    .get(viewProfile)
    .put(updateProfile)

module.exports = router;