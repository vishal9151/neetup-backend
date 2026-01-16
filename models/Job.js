import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    },
    topics: {
      type: [String],
      required: true
    },
    numberOfQuestions: {
      type: Number,
      required: true
    },
    result: Object,
    error: String
  },
  { timestamps: true }
);

// 🔥 IMPORTANT: index for reuse
jobSchema.index(
  { topics: 1, numberOfQuestions: 1, status: 1 }
);

export default mongoose.model("Job", jobSchema);
