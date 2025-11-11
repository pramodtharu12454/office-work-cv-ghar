import express from "express";

const router = express.Router();

router.post("/job/apply", async (req, res) => {
  
  return res.status(200).send({ message: "Job application received" });
});

export { router as JobClientcontroller };
