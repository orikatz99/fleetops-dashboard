import { useEffect, useState } from "react";
import KPICards from "./components/KPICards";
import RobotsTable from "./components/RobotsTable";
import type { Robot } from "./components/RobotsTable";
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

  const total = robots.length;
  const idle = robots.filter(r => r.status === "idle").length;
  const delivering = robots.filter(r => r.status === "delivering").length;
  const failed = robots.filter(r => r.status === "failed").length;

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>FleetOps Dashboard</h1>
        <p style={subtitleStyle}>
          Live fleet monitoring interface
        </p>

        <KPICards
          total={total}
          idle={idle}
          delivering={delivering}
          failed={failed}
        />

        <RobotsTable robots={robots} onCancel={cancelMission} />
      </div>
    </div>
  );
}

/* Layout Styles */

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
  backgroundColor: "#F5EFE6",
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

export default App;