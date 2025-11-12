import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    birthMonth: { type: String, required: true },
    birthDay: { type: String, required: true },
    birthYear: { type: String, required: true },
    gender: { type: String, required: true },
    jobPost: { type: String, required: true },
    cv: { type: String }, // Store file name or URL
  },
  { timestamps: true }
);

export const JobApplicationTable = mongoose.model(
  "JobApplication",
  JobApplicationSchema
);
