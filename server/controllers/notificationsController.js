const User = require('../models/User');
const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    const userId = req.user.id;
    const { id, type, from, to, message, data } = req.params;

    if (userId === id) return res.status(400).json({ message: 'Invalid notification creation.' });

    try {
        const user = await User.findById(userId);
        const targetUser = await User.findById(id);

        if (!targetUser) return res.status(404).json({ message: 'User not found.' });

        const newNotification = Notification.create({

        });
    }
    catch (err) {

    }
};

module.exports = {
    createNotification,
};