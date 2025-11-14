import express from "express";
import CompanyListing from "./company.schema.js";

const router = express.Router();

router.post("/company/form", async (req, res) => {
  try {
    const {
      companyName,
      panNumber,
      address,
      contactPerson,
      contactNumber,
      companyDocument,
      staffNeeded,
    } = CompanyListing(req.body);

    // 1️⃣ Check if PAN already exists
    const existingCompany = await CompanyListing.findOne({ panNumber });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message:
          "❌ This PAN number already exists. Duplicate entry not allowed.",
      });
    }

    // 2️⃣ Insert New Company
    const newCompany = await CompanyListing.create({
      companyName,
      panNumber,
      address,
      contactPerson,
      contactNumber,
      companyDocument,
      staffNeeded,
    });

    return res.status(200).json({
      success: true,
      message: "Company form submitted successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
});

export { router as CompanyFormController };
