const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/authMidlleware");
const applicationController = require("../controllers/applicationController");

router.post("/create", authenticateToken, applicationController.createApplication);
router.get("/my-applications", authenticateToken, applicationController.getUserApplications);
router.delete("/my-applications/:id", authenticateToken, applicationController.deleteApplication);
router.patch("/my-applications/:id/status", authenticateToken, applicationController.updateApplicationStatus);


module.exports = router;