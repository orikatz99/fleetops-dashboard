import express from "express";
import { initializeRobots } from "./simulation/store";
import { startEngine } from "./simulation/engine";
import { startMissionGenerator } from "./simulation/missionGenerator";
import robotsRouter from "./routes/robots.routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.send("FleetOps Backend Running");
});

app.use("/robots", robotsRouter);

// Initialization
initializeRobots(100);
startEngine();
startMissionGenerator();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});