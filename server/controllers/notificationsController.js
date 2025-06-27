const { getIO } = require('../socket');
const io = getIO();
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

        // Create the notification
        const newNotification = await Notification.create({
            type,
            from,
            to,
            message,
            data,
        });

        // Save the notification to the db user's notification array
        targetUser.notifications.unshift(newNotification._id);
        await targetUser.save();

        // Populate user: "from” (so the client gets username/avatar right away)
        const populatedNotif = await newNotification.populate('from', 'username avatar');

        // Socket emit to user on new notification
        io.to(to.toString()).emit('new-notification', populatedNotif);

        res.status(201).json({
            message: `Notification sent to ${targetUser.username}`,
            notification: populatedNotif,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create notification.', error: err.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        res.status(200).json(notification);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to mark notification as read.', error: err.message });
    }
}

const removeNotification = async (req, res) => {
    const { from, to, type } = req.body;

    try {
        const deletedNotification = await Notification.findOneAndDelete({ type, from, to });

        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        const userDeletedNotification = await User.findByIdAndUpdate(to, {
            $pull: { notifications: deletedNotification._id }
        });

         // Socket remove notification
        io.to(to.toString()).emit('remove-notification', {
            _id: deletedNotification._id,
            type,
            from,
        });

        res.status(200).json({ message: 'Notification successfully removed.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to remove notification.', error: err.message });
    }
}

module.exports = {
    createNotification,
    markAsRead,
    removeNotification
};