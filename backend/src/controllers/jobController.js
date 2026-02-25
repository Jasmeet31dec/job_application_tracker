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

const getExternalJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api',);
        const jobs = response.data.data;

        const jobMatch = jobs.find(j => j.slug === id);

        if (!jobMatch) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const formattedJob = {
            id: jobMatch.slug,
            title: jobMatch.title,
            company: jobMatch.company_name,
            location: jobMatch.location,
            type: jobMatch.job_types[0] || 'Full-time',
            fullDescription: jobMatch.description, // Keep HTML for the details page
            postedAt: "Live Now",
            salary: "Competitive",
            applyLink: jobMatch.url,
            companyDescription: `${jobMatch.company_name} is a leading firm looking for talent in ${jobMatch.location}.`
        };

        res.status(200).json({ success: true, data: formattedJob });

    } catch (error) {
        
        console.error("Controller Error (Details):", error.message);
        res.status(500).json({ success: false, message: "Error retrieving job details" });
    }
};

module.exports = {
    getExternalJobs,
    getExternalJobById
};