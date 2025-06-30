const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { createJob } = require('../controllers/jobsController');

router.route('/')
    .post(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner'), createJob);

module.exports = router;