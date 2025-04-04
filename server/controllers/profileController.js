const User = require('../models/User');

const viewProfile = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.params.username });
        if (!foundUser) return res.status(404).json({ message: 'User not found.' });

        res.status(200).json({
            name: `${foundUser.firstName} ${foundUser.lastName}`,
            email: foundUser.email,
            username: foundUser.username,
            role: foundUser.role,
            bio: foundUser.bio,
            location: foundUser.location,
            skills: foundUser.skills,
            avatar: foundUser.avatar,
            website: foundUser.website,
            github: foundUser.github,
            linkedin: foundUser.linkedin,
            otherWebsite: foundUser.otherWebsite,
        });
    }
    catch (err) {
        res.status(500).json({ message: `Server error while fetching profile.` });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { username: requestedUsername } = req.params;
        const userRole = req.user.role;
        const userId = req.user.id;

        const foundUser = await User.findOne({ username: requestedUsername });
        if (!foundUser) return res.status(404).json({ message: "User not found." });

        // Restrict edit access unless it's your own profile or you are an admin/owner
        if (foundUser._id.toString() !== userId && !['admin', 'owner'].includes(userRole)) return res.status(403).json({ message: "You are not authorized to edit this profile." });

        const { email, username, firstName, lastName, password, role, bio, location, skills, avatar, website, github, linkedin, otherWebsite } = req.body;

        const allowedUpdates = ['email', 'username', 'firstName', 'lastName', 'password', 'role', 'bio', 'location', 'skills', 'avatar', 'website', 'github', 'linkedin', 'otherWebsite'];
        const hasValidUpdate = allowedUpdates.some(field => req.body[field] !== undefined);
        if (!hasValidUpdate) return res.status(400).json({ message: "At least one valid field must be changed to update the user." });

        if (skills && !Array.isArray(skills)) return res.status(422).json({ message: "Skills must be of type array." });

        // Hash password if updating
        const hashedPassword = password ? await bcrypt.hash(password, 10) : foundUser.password;

        let newRole = foundUser.role;

        if (role) {
            if (userRole === 'owner') {
                newRole = role; // Owner can assign any role
            } else if (userRole === 'admin' && ['user', 'moderator'].includes(role)) {
                newRole = role; // Admin can only assign user/moderator
            }
        }

        // Update user with new fields
        const updatedUser = await User.findOneAndUpdate(
            { _id: foundUser._id },
            {
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                role: newRole,
                bio,
                location,
                skills,
                avatar,
                website,
                github,
                linkedin,
                otherWebsite
            },
            { new: true } // Returns the updated user
        );

        // Remove password before sending data back
        const { password: _, ...userData } = updatedUser.toObject();

        res.status(200).json({
            message: `User ${userData.username} successfully updated.`,
            user: userData
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch user.' });
    }
}

module.exports = {
    viewProfile,
    updateProfile
}