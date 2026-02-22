import express from "express";
import { initializeRobots } from "./simulation/store";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("FleetOps Backend Running");
});

initializeRobots(100);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});