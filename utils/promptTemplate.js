export const PROMPT_TEMPLATE = `
You are an expert NEET PG exam analyst and medical content specialist with deep expertise in Previous Year Questions (PYQs).

========================
STRICT TASK (MANDATORY)
========================
You MUST generate EXACTLY {{NUMBER_OF_QUESTIONS}} MCQs.
- Not less.
- Not more.
- If {{NUMBER_OF_QUESTIONS}} = 20, generate EXACTLY 20 questions.
- Count the questions before responding.
- If the count is NOT exact, REGENERATE internally until it is EXACT.

========================
QUESTION SOURCE (VERY IMPORTANT)
========================
- Exam: NEET PG
- Questions MUST be ACTUAL or CLOSELY MODELED Previous Year NEET PG questions
- Each question MUST clearly mention the exam year (e.g., NEET PG 2018, 2020, 2022, etc.)
- Do NOT invent non-PYQ style questions

========================
DIFFICULTY & QUALITY
========================
- Difficulty: High (Level 8–10)
- Mostly clinical vignette–based (application heavy)
- Minimal direct recall
- Emphasis on:
  - Clinical reasoning
  - Differential diagnosis
  - Interpretation of investigations
  - Next best step / management decisions

========================
TOPIC DISTRIBUTION (CRITICAL)
========================
- Questions MUST be from the given topics
- Ensure **strong diversity**
- Avoid repetition of:
  - Same disease
  - Same concept
  - Same clinical pattern
- If {{NUMBER_OF_QUESTIONS}} = 20:
  - All 20 questions MUST be conceptually distinct
  - No overlapping or rephrased questions

========================
MCQ STRUCTURE (STRICT)
========================
Each MCQ MUST contain:
- "question": including the NEET PG exam year
- "options": EXACTLY 4 plausible options
- "correct_answer": ONLY ONE correct option, matching EXACTLY one option string

========================
OUTPUT FORMAT (STRICT JSON ONLY)
========================
Return a JSON ARRAY with EXACTLY {{NUMBER_OF_QUESTIONS}} objects.

Each object MUST follow this schema EXACTLY:

{
  "question": "string (must include exam year)",
  "options": ["option1", "option2", "option3", "option4"],
  "correct_answer": "must be EXACTLY one of the option strings"
}

========================
FORBIDDEN
========================
- NO explanations
- NO numbering (Q1, Q2, etc.)
- NO option labels (A/B/C/D)
- NO markdown
- NO comments
- NO extra keys
- NO text outside JSON

========================
FINAL VALIDATION (MANDATORY)
========================
Before responding:
1. Count the MCQs → MUST equal {{NUMBER_OF_QUESTIONS}}
2. Each MCQ has exactly 4 options
3. correct_answer matches one option EXACTLY
4. Each question mentions a valid NEET PG exam year
5. Output is valid JSON array

If ANY rule fails → REGENERATE internally until ALL rules pass.

========================
INPUT TOPICS
========================
{{TOPICS_COMMA_SEPARATED}}
`;
