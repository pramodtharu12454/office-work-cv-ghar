import express from "express";
import { JobApplicationTable } from "./job.schema.js";

const router = express.Router();

// Job Application API
router.post("/job/apply", async (req, res) => {
  try {
    const { firstName, email } = req.body;

    // Check duplicate application
    const existing = await JobApplicationTable.findOne({
      firstName,
      email,
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "❌ Application already exists." });
    }

    // Save new application
    const application = new JobApplicationTable(req.body);
    await application.save();

    return res.status(200).json({
      message: "✅ Application submitted successfully.",
    });
  } catch (error) {
    console.error("Application Error:", error);
    return res.status(500).json({
      message: "❌ Server error while submitting application.",
    });
  }
});

router.get("/api/staff", async (req, res) => {
  try {
    // Fetch only firstName, lastName, and jobPost
    const staff = await JobApplicationTable.find({}).select(
      "firstName lastName jobPost "
    );
    return res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff applicants:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.get("/api/staff/full", async (req, res) => {
  try {
    const staff = await JobApplicationTable.find({}); // fetch all fields
    return res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff details:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export { router as JobClientcontroller };
