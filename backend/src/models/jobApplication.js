const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    position: {
      type: String,
      required: true,
      trim: true
    },

    jobLocation: {
      type: String,
      default: ""
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      default: "Full-time"
    },

    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Offer", "Rejected", "Ghosted", "Saved"],
      default: "Applied"
    },

    source: {
      type: String,
      enum: ["LinkedIn", "Indeed", "Naukri", "Company Website", "Referral", "Other"],
      default: "Other"
    },

    applicationLink: {
      type: String,
      default: ""
    },

    resumeVersion: {
      type: String,
      default: ""
    },

    appliedDate: {
      type: Date,
      default: Date.now
    },

    interviewDate: {
      type: Date
    },

    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);