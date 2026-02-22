import { Router } from "express";
import { missions } from "../simulation/store";

const router = Router();

router.get("/", (_req, res) => {
  res.json(missions);
});

export default router;