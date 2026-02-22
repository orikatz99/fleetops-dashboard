import { missions, robots } from "./store";
import { Mission } from "./models";

let missionCounter = 1;

export function startMissionGenerator() {
  setInterval(() => {
    createMission();
    createMission();
  }, 10000); // every 10 seconds
}

function createMission() {
  const idleRobot = robots.find((r) => r.status === "idle");
  if (!idleRobot) return;

  const newMission: Mission = {
    id: `mission-${missionCounter++}`,
    robotId: idleRobot.id,
    status: "assigned",
    enteredAt: Date.now(),
  };

  missions.push(newMission);

  idleRobot.status = "assigned";
  idleRobot.currentMissionId = newMission.id;
}