const axios = require('axios');

const getExternalJobs = async (req, res) => {
    try {
        // Fetching from Arbeitnow (Free Public Job API)
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        
        // Mapping the data to match your frontend structure
        const jobs = response.data.data.map(job => ({
            id: job.slug,
            title: job.title,
            company: job.company_name,
            location: job.location,
            type: job.remote ? "Remote" : "On-site",
            posted: "Recent",
            // Creating that high-impact one-liner you wanted
            description: job.tags.slice(0, 3).join(' • ') || "Global opportunity in tech",
            url: job.url
        }));

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });

    } catch (error) {
        console.error("API Fetch Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch external jobs"
        });
    }
};

module.exports = {
    getExternalJobs
};