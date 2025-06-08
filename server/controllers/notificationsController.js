const User = require('../models/User');
const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    const { type, from, to, message } = req.body;

    // Optional data for related important data - Profile url, post url, etc.
    const data = req.body.data || {};

    if (!type || !from || !to || !message) {
        return res.status(400).json({ message: 'Type, from, to, and message fields are required.' });
    }

    if (data && typeof data !== 'object') {
        return res.status(400).json({ message: 'Data must be an object.' });
    }

    try {
        const targetUser = await User.findById(to);

        if (!targetUser) return res.status(404).json({ message: 'User not found.' });

        const newNotification = await Notification.create({
            type,
            from,
            to,
            message,
            data,
        });

        targetUser.notifications.unshift(newNotification._id);
        await targetUser.save();

        res.status(201).json({
            message: `Notification sent to ${targetUser.username}`,
            notification: newNotification,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create notification.', error: err.message });
    }
};

module.exports = {
    createNotification,
};