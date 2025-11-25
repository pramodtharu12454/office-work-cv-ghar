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

router.post("/", async (req, res) => {
  try {
    // Basic validation
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({
          success: false,
          message: "firstName, lastName and email required",
        });
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    });

    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    // duplicate email case
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export { router as JobClientcontroller };
