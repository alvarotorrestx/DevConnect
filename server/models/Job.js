const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    remote: { type: Boolean, required: true },
    isSalary: { type: Boolean, required: true },
    salaryRange: {
        min: { type: Number },
        max: { type: Number },
    },
    hourlyRate: {
        min: { type: Number },
        max: { type: Number },
    },
    employmentType: {
        type: [String],
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Freelance'],
        required: true,
    },
    requiredSkills: { type: [String], default: [] },

    // Outside application link
    appLink: { type: String, default: '' },

    // Status of job listing
    status: { type: Boolean, default: true },

    // URL to job listing
    slug: { type: String, unique: true, sparse: true },

    // Reference to User - Recruiter
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

jobSchema.index({
    title: 'text',
    description: 'text',
    location: 'text'
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;