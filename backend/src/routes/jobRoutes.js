const express = require('express');
const router = express.Router();
const { getExternalJobs } = require('../controllers/jobController');

// This will be accessible at /api/jobs/external
router.get('/external', getExternalJobs);

module.exports = router;