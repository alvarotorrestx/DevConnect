const Job = require('../models/Job');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const createJob = async (req, res) => {

    const WEBSITE_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;

    try {
        const userId = req.user.id;

        const { title, description, company, location, remote, isSalary, salaryRange, hourlyRate, employmentType, requiredSkills, appLink } = req.body;

        // Ensure all fields are entered to create user
        if (!title || !description || !company || !location || remote === undefined || isSalary === undefined || !(salaryRange || hourlyRate) || !employmentType || !requiredSkills) {
            return res.status(400).json({ message: "All fields are required to create job listing." });
        }

        // TODO: Ensure salaryRange and hourlyRate not empty
        // TODO: Add enhanced security measures
        // Ensure req.body is of correct types

        // TODO: Find satisfying slug layout
        const generateSlug = (title, company) => {
            const clean = (str) => str
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            // Shortens the uuid
            const uniqueId = uuidv4();

            return `${clean(company)}-${clean(title)}-${uniqueId}`;
        };

        const slug = generateSlug(title, company);

        if (appLink && !WEBSITE_REGEX.test(appLink)) return res.status(422).json({ message: "Please enter a valid URL." });

        const newJob = await Job.create({
            title,
            description,
            company,
            location,
            remote,
            isSalary,
            salaryRange,
            hourlyRate,
            employmentType,
            requiredSkills,
            owner: userId,
            appLink: appLink || '',
            slug
        });

        await User.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } });

        res.status(201).json({
            message: `Job successfully created: ${newJob.title}`,
            newJob
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating job.", error: err.message });
    }
}

module.exports = {
    createJob,
}