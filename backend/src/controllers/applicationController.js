const applicationService = require("../services/applicationService");

async function updateApplicationStatus(req, res) {
  try {
    const userId = req.user.id; // from token
    const { id } = req.params;  // application ID
    const { status } = req.body; // new status

    const updatedApp = await applicationService.updateApplicationStatus(userId, id, status);

    if (!updatedApp) {
      return res.status(404).json({ error: "Application not found or not authorized to update." });
    }

    res.json({ message: "Application status updated successfully", updatedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteApplication(req, res) {
  try {
    const userId = req.user.id; // from token
    const { id } = req.params;  // application ID from route

    const deletedApp = await applicationService.deleteApplication(userId, id);

    if (!deletedApp) {
      return res.status(404).json({ error: "Application not found or not authorized to delete." });
    }

    res.json({ message: "Application deleted successfully", deletedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const getUserApplications = async (req, res) => {
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


const createApplication = async (req, res) => {
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


module.exports = {
  createApplication,
  getUserApplications,
  deleteApplication,
  updateApplicationStatus
};



