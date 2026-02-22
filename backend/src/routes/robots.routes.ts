import { Router } from "express";
import { robots } from "../simulation/store";

const router = Router();

router.get("/", (_req, res) => {
  res.json(robots);
});

export default router;