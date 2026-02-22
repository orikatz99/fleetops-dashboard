import express from "express";
import { initializeRobots } from "./simulation/store";
import { startEngine } from "./simulation/engine";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("FleetOps Backend Running");
});

initializeRobots(100);
startEngine();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});