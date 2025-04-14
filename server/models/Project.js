const mongoose = require('mongoose');

// Project Schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: {
        images: [String],
        videos: [String]
    },

    tags: { type: [String], default: [] },
    userTags: { type: [String], default: [] },
    techStack: { type: [String], default: [] },

    liveLink: { type: String, default: '' },
    sourceCodeLink: { type: String, default: '' },

    startDate: { type: Date },
    endDate: { type: Date },

    // For Project URL
    slug: { type: String, unique: true },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
