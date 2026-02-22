import { Robot, Mission } from "./models";

export const robots: Robot[] = [];
export const missions: Mission[] = [];

export function initializeRobots(count: number) {
  for (let i = 1; i <= count; i++) {
    robots.push({
      id: `robot-${i}`,
      status: "idle",
      currentMissionId: null,
    });
  }
}