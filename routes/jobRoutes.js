import { Router } from "express";
import {
  createJob,
  getJobStatus
} from "../controllers/jobController.js";

const router = Router();

router.post("/", createJob);        // POST /api/jobs
router.get("/:id", getJobStatus);   // GET /api/jobs/:id

export default router;
