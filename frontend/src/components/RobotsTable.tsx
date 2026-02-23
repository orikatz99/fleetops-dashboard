import React from "react";

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

interface RobotsTableProps {
  robots: Robot[];
  onCancel: (robotId: string) => void;
}

const statusColors: Record<RobotStatus, string> = {
  idle: "#9CA3AF",
  assigned: "#5B8DEF",
  en_route: "#4CB8C4",
  delivering: "#E8A03C",
  completed: "#52B788",
  failed: "#D65A5A",
  cancelled: "#9D79BC",
};

function RobotsTable({ robots, onCancel }: RobotsTableProps) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Robot ID</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Mission</th>
          <th style={thStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        {robots.map((robot) => (
          <tr key={robot.id}>
            <td style={tdStyle}>{robot.id}</td>
            <td style={tdStyle}>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  backgroundColor: statusColors[robot.status],
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {robot.status}
              </span>
            </td>
            <td style={tdStyle}>
              {robot.currentMissionId || "-"}
            </td>
            <td style={tdStyle}>
              {robot.currentMissionId && (
                <button
                  onClick={() => onCancel(robot.id)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#C65A5A",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Table Styles */

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "1px solid #E0D6C8",
  fontSize: "14px",
  color: "#5C5C5C",
};

const tdStyle: React.CSSProperties = {
  padding: "14px",
  borderBottom: "1px solid #E8DFD3",
  color: "#2C2C2C",
};

export default RobotsTable;