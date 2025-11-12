import express from "express";
import { JobApplicationTable } from "./job.schema.js";

const router = express.Router();

// Job Application API
router.post("/job/apply", async (req, res) => {
  const application = new JobApplicationTable(req.body);
  const user = await JobApplicationTable.find({
    firstName: application.firstName,
    email: application.email,
  });
  if (user) {
    return res.status(409).send({ message: "application already exists." });
  }
  await application.save();
  return res
    .status(200)
    .send({ message: " submitting application successful" });
});

export { router as JobClientcontroller };
