const express = require('express');
const router = express.Router();
const JobApplication = require("../models/jobApplication");
const { authenticateToken, adminMiddleware } = require("../utils/authMidlleware");


router.get('/user-applications/:userId', authenticateToken,adminMiddleware,async (req, res) => {
    try {
        // Fetch applications belonging to the specific customer ID
        const apps = await JobApplication.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;