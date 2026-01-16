import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server alive 🚀" });
});

export default router;
