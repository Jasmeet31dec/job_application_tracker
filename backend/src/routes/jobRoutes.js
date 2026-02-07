const express = require('express');
const router = express.Router();
const { getExternalJobs,getExternalJobById } = require('../controllers/jobController');

// This will be accessible at /api/jobs/external
router.get('/external', getExternalJobs);
router.get('/external/:id',getExternalJobById);

module.exports = router;