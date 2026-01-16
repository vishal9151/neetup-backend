import OpenAI from "openai";
import Job from "../models/Job.js";
import { PROMPT_TEMPLATE } from "../utils/promptTemplate.js";
import { chooseModel } from "../services/modelService.js";

export const processQuestionJob = async (jobId) => {
  try {
    await Job.findByIdAndUpdate(jobId, { status: "processing" });
    const job = await Job.findById(jobId);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log(job);

    const prompt = PROMPT_TEMPLATE
      .replace("{{NUMBER_OF_QUESTIONS}}", job.numberOfQuestions)
      .replace("{{TOPICS_COMMA_SEPARATED}}", job.topics.join(", "));

    const completion = await client.chat.completions.create({
      model: chooseModel(),
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }]
    });

    const result = JSON.parse(
      completion.choices[0].message.content
    );

    await Job.findByIdAndUpdate(jobId, {
      status: "completed",
      result
    });

  } catch (err) {
    await Job.findByIdAndUpdate(jobId, {
      status: "failed",
      error: err.message
    });
  }
};
