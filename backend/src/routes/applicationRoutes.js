const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/authMidlleware");
const { createApplication, getUserApplications } = require("../controllers/applicationController");

router.post("/create", authenticateToken, createApplication);
router.get("/my-applications", authenticateToken, getUserApplications);


module.exports = router;