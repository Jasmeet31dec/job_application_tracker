const JobApplication = require("../models/jobApplication");

async function updateApplicationStatus(userId, applicationId, status) {
  const updatedApp = await JobApplication.findOneAndUpdate(
    { _id: applicationId, user:userId },   // ensure ownership
    { status },
    { new: true }                     // return updated document
  );
  return updatedApp; // null if not found or not owned
}


async function deleteApplication(userId, applicationId) {
  const app = await JobApplication.findOneAndDelete({ _id: applicationId, user:userId });
  return app; // will be null if not found or not owned by user
}


async function getApplicationsByUser(userId) {
  return await JobApplication.find({ user: userId }).sort({ createdAt: -1 });
};


async function createApplication(applicationData) {
  const application = new JobApplication(applicationData);
  return await application.save();
};

module.exports = {
  createApplication,
  getApplicationsByUser,
  deleteApplication,
  updateApplicationStatus
};

