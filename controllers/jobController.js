import Job from "../models/Job.js";
import { processQuestionJob } from "../workers/questionWorker.js";

export const createJob = async (req, res) => {
  const { topics, numberOfQuestions } = req.body;

  if (!topics || !Array.isArray(topics) || !numberOfQuestions) {
    return res.status(400).json({ success: false });
  }

  // ✅ Normalize topics (VERY IMPORTANT)
  const sortedTopics = [...topics].sort();

  // 🔥 STEP 1: Check DB for existing SUCCESS result
  const existingJob = await Job.findOne({
    topics: sortedTopics,
    numberOfQuestions,
    status: "completed"
  });

  if (existingJob) {
    console.log("⚡ Served directly from DB (no OpenAI call)");

    return res.status(200).json({
      success: true,
      fromCache: true,
      result: existingJob.result,
      jobId: existingJob._id
    });
  }

  // 🔁 STEP 2: Create new job
  const job = await Job.create({
    topics: sortedTopics,
    numberOfQuestions,
    status: "pending"
  });

  // 🔥 Background processing (non-blocking)
  setImmediate(() => processQuestionJob(job._id));

  return res.status(202).json({
    success: true,
    fromCache: false,
    jobId: job._id
  });
};


export const getJobStatus = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ success: false });
  }

  res.json({
    success: true,
    status: job.status,
    result: job.result || null,
    error: job.error || null
  });
};
