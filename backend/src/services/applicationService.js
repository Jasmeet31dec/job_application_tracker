const JobApplication = require("../models/JobApplication");


exports.getApplicationsByUser = async (userId) => {
  return await JobApplication.find({ user: userId }).sort({ createdAt: -1 });
};

exports.createApplication = async (applicationData) => {
  const application = new JobApplication(applicationData);
  return await application.save();
};