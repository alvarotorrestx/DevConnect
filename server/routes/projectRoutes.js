const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyRoles } = require("../middleware/verifyRoles");
const {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} = require("../controllers/projectController.js");

router
  .route("/create")
  .post(verifyJWT, verifyRoles("user", "admin", "owner"), createProject);

router
  .route("/:id")
  .delete(verifyJWT, verifyRoles("user", "admin", "owner"), deleteProject);

router
  .route("/allProjects")
  .get(verifyJWT, verifyRoles("user", "admin", "owner"), getAllProjects);

router
  .route("/update")
  .patch(verifyJWT, verifyRoles("user", "admin", "owner"), updateProject);

module.exports = router;
