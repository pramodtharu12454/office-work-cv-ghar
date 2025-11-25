import express from "express";
import multer from "multer";
import CompanyListing from "./company.schema.js";

const router = express.Router();

// ==========================
// Multer Setup (Uploads Folder)
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder MUST exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ==========================
//   POST: COMPANY FORM
// ==========================
router.post(
  "/company/form",
  upload.single("companyDocument"),
  async (req, res) => {
    try {
      const {
        companyName,
        panNumber,
        address,
        contactPerson,
        contactNumber,
        staffNeeded,
      } = req.body;

      // Optional File
      const companyDocument = req.file ? req.file.filename : "";

      // Check Duplicate PAN
      const existingCompany = await CompanyListing.findOne({ panNumber });
      if (existingCompany) {
        return res.status(400).json({
          success: false,
          message: "❌ This PAN number already exists!",
        });
      }

      // Save New Company
      const newCompany = await CompanyListing.create({
        companyName,
        panNumber,
        address,
        contactPerson,
        contactNumber,
        staffNeeded,
        companyDocument,
      });

      return res.status(200).json({
        success: true,
        message: "✅ Company form submitted successfully",
        data: newCompany,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "❌ Server error!",
      });
    }
  }
);

export { router as CompanyFormController };
