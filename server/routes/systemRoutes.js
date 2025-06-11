const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles');
const { createNotification, markAsRead, removeNotification } = require('../controllers/notificationsController');

router.route('/notifications')
    .post(verifyJWT, verifyRoles('user', 'moderator', 'admin', 'owner', 'system'), createNotification)
    .delete(verifyJWT, removeNotification)

router.route('/notifications/:id/read')
    .patch(verifyJWT, markAsRead)


module.exports = router;