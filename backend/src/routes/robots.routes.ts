import { Router } from "express";
import { robots } from "../simulation/store";
import { missions } from "../simulation/store";

const router = Router();

// Endpoint to get all robots and their statuses
router.get("/", (_req, res) => {
  res.json(robots);
});

// Endpoint to cancel a mission for a specific robot
router.post("/:id/cancel", (req, res) => {
  const robotId = req.params.id;

  const robot = robots.find((r) => r.id === robotId);
  if (!robot) {
    return res.status(404).json({ message: "Robot not found" });
  }

  if (!robot.currentMissionId) {
    return res.status(400).json({ message: "Robot has no active mission" });
  }

  const mission = missions.find(
    (m) => m.id === robot.currentMissionId
  );

  if (!mission) {
    return res.status(400).json({ message: "Mission not found" });
  }

  mission.status = "cancelled";
  mission.enteredAt = Date.now();
  robot.status = "cancelled";

  res.json({ message: "Mission cancelled successfully" });
});


export default router;
