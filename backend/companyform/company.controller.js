import express from "express";

const router = express.Router();

router.post("company/form", async (req, res) => {
  return res
    .status(200)
    .send({ message: "company form submitted successfully" });
});

export { router as CompanyFormController };
