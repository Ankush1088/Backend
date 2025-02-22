import { Application } from "../Models/Application.model.js";
import {Job} from "../Models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params; // second way to right  const job = req.params.id
    if (!jobId) {
      return res
        .status(404)
        .json({ message: "invalid job id ", sucess: false });

      // check if the user already has applied for this job or not
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
      if (existingApplication) {
        return res
          .status(400)
          .json({
            message: " you have already apply for yhe job ",
            sucess: false,
          });
      }
    }
    // check if the job exists or not
    const job = await job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: " job not found ", sucess: false });
    }
    // create a new application
    const newApplication = await  Application.create ({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({message:"Application submitted",sucess:true});

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Application failed to be created", sucess: false });
  }
};


export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application status updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};