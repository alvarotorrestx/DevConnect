const User = require('../models/User');

const getAllFollowers = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found." });

        // Fetch all of user's followers
        const userFollowers = await User.find({ _id: { $in: user.followers } })
            .select('username avatar firstName lastName role')
            .sort({ createdAt: -1 });

        res.status(200).json({ userFollowers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching followers list.", error: err.message });
    }
};

const getAllFollowing = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found." });

        // Fetch all of user's following
        const userFollowing = await User.find({ _id: { $in: user.following } })
            .select('username avatar firstName lastName role')
            .sort({ createdAt: -1 });

        res.status(200).json({ userFollowing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching following list.", error: err.message });
    }
};

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
    getAllFollowers,
    getAllFollowing
}