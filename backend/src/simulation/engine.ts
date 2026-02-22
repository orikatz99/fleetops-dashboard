import { missions, robots } from "./store";
import { MissionStatus, Mission } from "./models";

const STATE_DURATIONS: Record<MissionStatus, number> = {
  assigned: 5000,
  en_route: 15000,
  delivering: 15000,
  completed: 3000,
  failed: 3000,
  cancelled: 3000,
};

export function startEngine() {
  setInterval(() => {
    updateMissions();
  }, 1000);
}

function updateMissions() {
  const now = Date.now();

  // נשתמש בעותק כדי להימנע מבעיות בזמן מחיקה
  [...missions].forEach((mission) => {
    const duration = STATE_DURATIONS[mission.status];
    if (!duration) return;

    const timeInState = now - mission.enteredAt;

    if (timeInState >= duration) {
      advanceMission(mission);
    }
  });
}

function advanceMission(mission: Mission) {
  const robot = robots.find((r) => r.id === mission.robotId);
  if (!robot) return;

  switch (mission.status) {
    case "assigned":
      mission.status = "en_route";
      mission.enteredAt = Date.now();
      robot.status = "en_route";
      break;

    case "en_route":
      // 5% failure simulation
      if (Math.random() < 0.05) {
        mission.status = "failed";
        mission.enteredAt = Date.now();
        robot.status = "failed";
      } else {
        mission.status = "delivering";
        mission.enteredAt = Date.now();
        robot.status = "delivering";
      }
      break;

    case "delivering":
      mission.status = "completed";
      mission.enteredAt = Date.now();
      robot.status = "completed";
      break;

    case "completed":
    case "failed":
    case "cancelled":
      robot.status = "idle";
      robot.currentMissionId = null;

      // Remove mission from memory
      const index = missions.findIndex((m) => m.id === mission.id);
      if (index !== -1) {
        missions.splice(index, 1);
      }
      break;
  }
}