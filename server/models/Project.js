const mongoose = require('mongoose');

// Project Schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: { 
        images:{type: [String], default: []},
        videos:{type: [String], default: []}
     },

    tags: { type: [String], default: [] },
    userTags: { type: [String], default: [] },
    techStack: { type: [String], default: [] },

    liveLink: { type: String, default: '' },
    sourceCodeLink: { type: String, default: '' },

    
    duration:{type:String,default:Date.now()},

    // For Project URL
    slug: { type: String, unique: true },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
