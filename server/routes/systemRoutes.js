const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { createNotification, markAsRead } = require('../controllers/notificationsController');

router.route('/notifications')
    .post(verifyJWT, verifyRoles('admin', 'owner', 'system'), createNotification)

router.route('/notifications/:id/read')
    .patch(verifyJWT, markAsRead)


module.exports = router;