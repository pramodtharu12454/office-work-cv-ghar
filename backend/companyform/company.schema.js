import mongoose from "mongoose";

const CompanyListingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    panNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    companyDocument: {
      type: String, // store file URL (Cloudinary, etc.)
      required: false,
    },
    staffNeeded: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot reloads
const CompanyListing =
  mongoose.models.CompanyListing ||
  mongoose.model("CompanyListing", CompanyListingSchema);

export default CompanyListing;
