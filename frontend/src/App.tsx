import { useEffect, useState } from "react";

type RobotStatus =
  | "idle"
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed"
  | "failed"
  | "cancelled";

interface Robot {
  id: string;
  status: RobotStatus;
  currentMissionId: string | null;
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

function App() {
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    fetchRobots();
    const interval = setInterval(fetchRobots, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchRobots = async () => {
    const res = await fetch("http://localhost:3000/robots");
    const data = await res.json();
    setRobots(data);
  };

  const cancelMission = async (robotId: string) => {
    await fetch(`http://localhost:3000/robots/${robotId}/cancel`, {
      method: "POST",
    });
    fetchRobots();
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>FleetOps Dashboard</h1>
        <p style={subtitleStyle}>
          Total Robots: {robots.length}
        </p>

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
              <tr key={robot.id} style={rowStyle}>
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
      onClick={() => cancelMission(robot.id)}
      style={{
        padding: "6px 16px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#C65A5A",
        color: "white",
        cursor: "pointer",
        transition: "0.2s ease",
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
      </div>
    </div>
  );
}

/* -------- Styles -------- */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
  paddingBottom: "80px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle: React.CSSProperties = {
  width: "1100px",
  backgroundColor: "#F5EFE6", // soft beige card
  padding: "50px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "42px",
  color: "#2C2C2C",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#6B7280",
  marginBottom: "40px",
};

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

const rowStyle: React.CSSProperties = {
  transition: "background 0.2s ease",
};

export default App;