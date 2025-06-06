const User = require('../models/User');

const toggleFollowUser = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    if (userId === id) return res.status(400).json({ message: "Tsk tsk tsk... you can't follow yourself!" });

    try {
        const user = await User.findById(userId);
        const targetUser = await User.findById(id);

        if (!targetUser) return res.status(404).json({ message: 'User not found.' });

        // Bool if user is currently following the target user to follow/unfollow
        const isFollowing = user.following.includes(id);

        if (isFollowing) { // Unfollow user
            user.following.pull(id);
            targetUser.followers.pull(userId);
        } else { // Follow the user
            user.following.push(id);
            targetUser.followers.push(userId);
        }

        await user.save();
        await targetUser.save();

        return res.status(200).json({
            message: isFollowing ? `Unfollowed ${targetUser.username}.` : `${targetUser.username} followed.`,
            following: user.following,
            followers: targetUser.followers
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
}

module.exports = {
    toggleFollowUser,
}