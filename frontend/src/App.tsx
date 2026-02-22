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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>FleetOps Dashboard</h1>

      <table border={1} cellPadding={10} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Robot ID</th>
            <th>Status</th>
            <th>Mission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot.id}>
              <td>{robot.id}</td>
              <td>{robot.status}</td>
              <td>{robot.currentMissionId || "-"}</td>
              <td>
                {robot.currentMissionId && (
                  <button onClick={() => cancelMission(robot.id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;