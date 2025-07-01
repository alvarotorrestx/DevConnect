const Job = require('../models/Job');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const createJob = async (req, res) => {

    const WEBSITE_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;

    try {
        const userId = req.user.id;

        const { title, description, company, location, remote, isSalary, salaryRange, hourlyRate, employmentType, requiredSkills, appLink } = req.body;

        // Ensure all fields are entered to create user
        if (!title || !description || !company || !location || remote === undefined || isSalary === undefined || !(salaryRange || hourlyRate) || !employmentType) {
            return res.status(400).json({ message: "All fields are required to create job listing." });
        }

        if (isSalary) {
            if (!Array.isArray(salaryRange) || salaryRange.length !== 2 || !salaryRange.every(num => typeof num === 'number')) {
                return res.status(422).json({ message: "Salary range must be an array of 2 numbers." });
            }
        } else {
            if (!Array.isArray(hourlyRate) || hourlyRate.length !== 2 || !hourlyRate.every(num => typeof num === 'number')) {
                return res.status(422).json({ message: "Hourly rate must be an array of 2 numbers." });
            }
        }

        const allowedTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Freelance'];

        if (!Array.isArray(employmentType) || employmentType.length === 0 || !employmentType.every(type => allowedTypes.includes(type))) {
            return res.status(422).json({ message: "Employment type must be an array of valid types." });
        }

        if (requiredSkills && !Array.isArray(requiredSkills)) {
            return res.status(422).json({ message: "Skills must be an array." });
        }

        // Generate slug with layout of company/title_of_job/uuid
        const generateSlug = (title, company) => {
            const clean = (str) => str
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            // Generate UUID and remove dashes
            const uniqueId = uuidv4().replace(/-/g, '');

            return `${clean(company)}/${clean(title)}/${uniqueId}`;
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