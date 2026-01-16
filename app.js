import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import pingRoutes from "./routes/pingRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "*", // dev only
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/ping", pingRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("🔥 NEET MCQ Generator API is live!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
