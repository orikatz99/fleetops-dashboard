export type RobotStatus =
  | "idle"
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed"
  | "failed"
  | "cancelled";

export interface Robot {
  id: string;
  status: RobotStatus;
  currentMissionId: string | null;
}

export type MissionStatus =
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed"
  | "failed"
  | "cancelled";

export interface Mission {
  id: string;
  robotId: string;
  status: MissionStatus;
  enteredAt: number;
}