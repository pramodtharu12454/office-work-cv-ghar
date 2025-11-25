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
      unique: true,
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
    staffNeeded: {
      type: String,
      required: true,
      trim: true,
    },
    companyDocument: {
      type: String, // now optional — no file saved
      default: "",
    },
  },
  { timestamps: true }
);

const CompanyListing =
  mongoose.models.CompanyListing ||
  mongoose.model("CompanyListing", CompanyListingSchema);

export default CompanyListing;
