const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res) => {
  const userId = req.user.id;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ messaeg: "Unauthorized user" });
  }

  if (!req.body || !req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  JSON.stringify(req.body.media);
  try {
    const {
      title,
      description,
      media,
      tags,
      userTags,
      techStack,
      liveLink,
      sourceCodeLink,
      duration,
    } = req.body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newProject = await Project.create({
      title,
      description,
      media,
      tags,
      userTags,
      techStack,
      liveLink,
      sourceCodeLink,
      duration,
      slug,
      owner: userId,
    });

    const user = await User.findByIdAndUpdate(userId, {
      $push: { projects: newProject._id },
    });

    res.status(201).send({
      message: "Project created successfully",
      result: newProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating project." });
  }
};

const deleteProject = async (req, res) => {
  if (!req.params || !req.params.id) {
    return res.status(400).json({ message: "Project Id is required" });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  try {

    const { id } = req.params;
    const project = await Project.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { projects: project._id },
    });

    return res.status(200).json({
      message: "Project deleted successfully",
      reult: project,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting project" });
  }
};

const updateProject = async (req, res) => {
  const { _id, owner, ...updates } = req.body; 

   if(!req.user || !req.user.id){
    return res.status(401).json({message:"Unauthorized user"})
   }

   if(!updates || Object.keys(updates).length===0){
     return res.status(400).json({message:"No updates provided"})
   }

  try {
    const project = await Project.findOneAndUpdate(
       {_id},
       { $set: updates },
       { new: true, runValidators: true }
    );
   
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      result: project,
    });

  } catch (err) {  
    return res.status(500).json({ message: "Error updating project" });
  }
};

const getAllProjects = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {

    const projects = await Project.find({ owner: req.user.id });
    
    if(!projects || projects.length ===0){
      return res.status(200).json({message:"No project found",projects:[]})
    }
 
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

module.exports = { createProject, deleteProject, getAllProjects ,updateProject};
