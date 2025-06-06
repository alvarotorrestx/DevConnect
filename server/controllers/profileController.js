const User = require('../models/User');
const validator = require('validator');

const viewProfile = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.params.username });
        if (!foundUser) return res.status(404).json({ message: 'User not found.' });

        res.status(200).json({
            id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
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

    // REGEX for validation
    const NAME_REGEX = /^[a-zA-Z][a-zA-Z- ]{1,50}$/;
    const USERNAME_REGEX = /^[a-z0-9-]{5,30}$/;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const WEBSITE_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;
    const LOCATION_REGEX = /^[a-zA-Z\s,.'-]{2,100}$/;
    const VALID_ROLES = ['user', 'moderator', 'admin', 'owner'];

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
            if (!VALID_ROLES.includes(role)) {
                return res.status(422).json({ message: 'Invalid role provided.' });
            }

            if (userRole === 'owner') {
                newRole = role; // Full access
            } else if (userRole === 'admin') {
                if (['user', 'moderator'].includes(role)) {
                    newRole = role;
                } else {
                    return res.status(403).json({ message: 'Admins can only assign user or moderator roles.' });
                }
            } else {
                // Non-admin/owner trying to set a role
                return res.status(403).json({ message: 'You are not authorized to change roles.' });
            }
        }

        if (firstName !== undefined && !NAME_REGEX.test(firstName)) {
            return res.status(422).json({
                message: "Invalid first name.\n2 to 50 characters.\nLetters, spaces, and hyphens (-) allowed."
            });
        }

        if (lastName !== undefined && !NAME_REGEX.test(lastName)) {
            return res.status(422).json({
                message: "Invalid last name.\n2 to 50 characters.\nLetters, spaces, and hyphens (-) allowed."
            });
        }

        if (username !== undefined && !USERNAME_REGEX.test(username)) {
            return res.status(422).json({
                message: "Invalid username.\n5 to 30 characters.\nLetters, numbers, and hyphens (-) allowed.\nLowercase only."
            });
        }

        if (email !== undefined && !EMAIL_REGEX.test(email)) {
            return res.status(422).json({
                message: "Invalid email.\ne.g. bwayne@wayneenterprises.com"
            });
        }

        const urlFields = [
            { field: avatar, label: "Avatar URL" },
            { field: website, label: "Website URL" },
            { field: github, label: "GitHub URL" },
            { field: linkedin, label: "LinkedIn URL" },
            { field: otherWebsite, label: "Other Website URL" },
        ];

        for (const { field, label } of urlFields) {
            if (field !== undefined && field.trim() !== '' && !WEBSITE_REGEX.test(field)) {
                return res.status(422).json({ message: `Invalid ${label}.` });
            }
        }

        let sanitizedBio;
        if (bio !== undefined) {
            const trimmedBio = bio.trim();
            sanitizedBio = trimmedBio === "" ? null : validator.escape(trimmedBio);

            if (sanitizedBio && sanitizedBio.length > 500) {
                return res.status(422).json({ message: "Bio must be 500 characters or less." });
            }
        } else {
            sanitizedBio = foundUser.bio;
        }

        if (location !== undefined && location.trim() !== '' && !LOCATION_REGEX.test(location.trim())) {
            return res.status(422).json({
                message: "Invalid location.\nOnly letters, spaces, commas, hyphens, apostrophes, and periods allowed.\n2 to 100 characters."
            });
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
                bio: sanitizedBio,
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
        console.error("UpdateProfile Error:", err);
        res.status(500).json({ message: 'Failed to fetch user.' });
    }
}

module.exports = {
    viewProfile,
    updateProfile
}
