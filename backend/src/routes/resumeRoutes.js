const express = require('express');
const router = express.Router();
const { buildResume } = require('../controllers/resumeController');

// Standard POST route - no login required
router.post('/build', buildResume);

module.exports = router;