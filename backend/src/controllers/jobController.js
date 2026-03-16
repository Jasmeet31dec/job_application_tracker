const axios = require('axios');

// --- CACHING SETUP ---
let jobsCache = {
    data: null,
    lastFetched: null
};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Helper function to fetch and cache data
 * This avoids redundant code in both controllers
 */
const fetchAndCacheJobs = async () => {
    const now = Date.now();
    
    // Check if we have valid cached data
    if (jobsCache.data && (now - jobsCache.lastFetched < CACHE_DURATION)) {
        console.log("Serving from cache...");
        return jobsCache.data;
    }

    try {
        console.log("Fetching fresh data from API...");
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api', {
            timeout: 8000,
            headers: {
                // Helps prevent 403 errors by identifying the request
                'User-Agent': 'TracklyJobApp/1.0 (Contact: admin@example.com)'
            }
        });

        // Update cache
        jobsCache.data = response.data.data;
        jobsCache.lastFetched = now;

        return jobsCache.data;
    } catch (error) {
        // If API fails but we have stale cache, return stale cache as fallback
        if (jobsCache.data) {
            console.warn("API Failed, serving stale cache...");
            return jobsCache.data;
        }
        throw error;
    }
};

const getExternalJobs = async (req, res) => {
    try {
        const rawJobs = await fetchAndCacheJobs();
        
        const jobs = rawJobs.map(job => ({
            id: job.slug,
            title: job.title,
            company: job.company_name,
            location: job.location,
            type: job.remote ? "Remote" : "On-site",
            posted: "Recent",
            description: job.tags.slice(0, 3).join(' • ') || "Global opportunity in tech",
            url: job.url
        }));

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });

    } catch (error) {
        res.status(503).json({
            success: false,
            message: "Job service is temporarily unavailable. Please try again later."
        });
    }
};

const getExternalJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const rawJobs = await fetchAndCacheJobs();

        const jobMatch = rawJobs.find(j => j.slug === id);

        if (!jobMatch) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const formattedJob = {
            id: jobMatch.slug,
            title: jobMatch.title,
            company: jobMatch.company_name,
            location: jobMatch.location,
            type: jobMatch.job_types[0] || 'Full-time',
            fullDescription: jobMatch.description,
            postedAt: "Live Now",
            salary: "Competitive",
            applyLink: jobMatch.url,
            companyDescription: `${jobMatch.company_name} is a leading firm looking for talent in ${jobMatch.location}.`
        };

        res.status(200).json({ success: true, data: formattedJob });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving job details" });
    }
};

module.exports = {
    getExternalJobs,
    getExternalJobById
};