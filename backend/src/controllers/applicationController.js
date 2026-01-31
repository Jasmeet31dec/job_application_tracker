const applicationService = require("../services/applicationService");

exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const applications = await applicationService.getApplicationsByUser(userId);

    res.status(200).json({
      message: "Applications fetched successfully",
      data: applications
    });

  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.createApplication = async (req, res) => {
  try {
    const userId = req.user.id;        // from JWT
    const userEmail = req.user.email;  // from JWT

    const applicationData = {
      ...req.body,
      user: userId,
      userEmail: userEmail
    };

    const newApplication = await applicationService.createApplication(applicationData);
    
    res.status(201).json({
      message: "Application created successfully",
      data: newApplication
    });

  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};