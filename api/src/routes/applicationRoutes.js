const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/authMidlleware");
const upload = require('../middleware/upload');
const applicationController = require("../controllers/applicationController");

router.post("/create", authenticateToken, upload.single('resume'),applicationController.createApplication);
router.get("/my-applications", authenticateToken, applicationController.getUserApplications);
router.delete("/my-applications/:id", authenticateToken, applicationController.deleteApplication);
router.patch("/my-applications/:id/status", authenticateToken, applicationController.updateApplicationStatus);
router.get("/savedJobs",authenticateToken,applicationController.getSavedUserApplications);

module.exports = router;