# FleetOps Dashboard – Deliverz.ai Home Assignment

## Overview

This project is a TypeScript-based simulation of an internal Fleet Operations dashboard for monitoring autonomous delivery robots.

The system simulates a fleet of robots operating in a hospital-like environment. It includes:

- Backend simulation engine (Node.js + Express, TypeScript)
- React-based frontend dashboard (TypeScript)
- In-memory mission lifecycle management
- Robot state transitions over time
- Mission cancellation capability
- Theoretical AWS production architecture design

All data is kept strictly in memory, as required.

---

# Tech Stack

## Backend
- Node.js
- Express
- TypeScript

## Frontend
- React
- TypeScript
- Polling-based updates (every 2 seconds)

---

# Running the Project Locally

## Prerequisites
- Node.js 18+
- npm

## 1) Start Backend

cd backend  
npm install  
npm run dev  

Backend runs on:  
http://localhost:3000

---

## 2) Start Frontend

cd frontend  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173

---

# API Endpoints

GET /robots  
Returns all robots and their current states.

POST /robots/:robotId/cancel  
Cancels the active mission of a specific robot.

GET /missions  
Returns all active missions.

---

# Simulation Logic

## Initial State

- 100 robots are initialized in memory.
- All robots start in `idle`.
- No missions exist at startup.

---

## Mission Generation

The original requirement specified creating two missions every 60 seconds.

For demonstration and observability purposes, the interval was reduced to 10 seconds.  
This allows faster visibility of concurrency limits, state transitions, and system behavior during development.

Every 10 seconds:
- Two new missions are created.
- Each mission is assigned to the next available `idle` robot.
- If no robot is idle, no mission is created.

This models operational throughput constraints and highlights capacity limits within the fleet.

---

# Mission Lifecycle (State Machine)

assigned → en_route → delivering → completed

Exceptional states:
- failed
- cancelled

---

## State Durations

| State       | Duration |
|-------------|----------|
| assigned    | 5 seconds |
| en_route    | 15 seconds |
| delivering  | 15 seconds |
| completed   | 3 seconds |
| failed      | 3 seconds |
| cancelled   | 3 seconds |

Total mission time ≈ 38 seconds.

---

## Failure Simulation

During the `en_route` state:
- There is a 5% probability the mission transitions to `failed`.

This intentionally simulates real-world operational unreliability and demonstrates handling of non-happy paths.

---

## Cancel Behavior

When the Cancel button is pressed:

1. The mission transitions to `cancelled`
2. The robot transitions back to `idle`
3. The mission is removed from memory after reaching a terminal state

This ensures clean lifecycle termination and prevents memory growth over time.

---

# Handling No Available Robots (Design Decision)

If no robot is in `idle` state, a new mission is not created.

This is a deliberate simplification for the scope of this assignment.

In a real-world production system, missions would likely enter a `pending` or `queued` state until a robot becomes available.  
This would require introducing:

- A mission queue
- Scheduling logic
- Possibly priority handling
- Capacity-aware dispatch algorithms

For clarity and focus on state transitions, this simulation models mission creation only when capacity is available.

---

# Throughput Behavior

Given:
- 2 missions are created every 10 seconds
- Each mission lasts ~38 seconds

The system stabilizes at approximately 8 concurrent missions.

This is a natural result of mission generation rate versus service time and is not a bug.

---

# Design Decisions

## In-Memory Storage

Chosen to:
- Follow assignment constraints
- Keep implementation simple
- Focus on state transitions and simulation logic

Restarting the server resets all data.

---

## Polling Instead of WebSockets

Frontend polls every 2 seconds.

Tradeoff:
- Simpler implementation
- Slightly higher network overhead
- Acceptable for assignment scope

In production, WebSockets or server-sent events would be preferable.

---

## Deterministic Robot Assignment

Missions are assigned to the first available idle robot.

Alternative strategies could include:
- Random selection
- Least recently used
- Load balancing
- Location-based allocation

The current strategy prioritizes clarity over scheduling optimization.

---

# Scaling Considerations

For 100 robots:
- Linear scans are acceptable
- In-memory operations are lightweight

For production-scale systems:
- Distributed state storage (Redis/DynamoDB)
- Event-driven architecture
- WebSocket-based updates
- Observability and metrics
- Horizontal scaling via container orchestration

---

# AWS Production Architecture (Theoretical)

## Core Services

- S3 – Host frontend
- CloudFront – CDN
- API Gateway – Public API
- ECS Fargate – Backend containers
- Application Load Balancer – Traffic routing
- CloudWatch – Logging and monitoring
- IAM – Access control
- VPC – Network isolation

---

## Optional Production Enhancements

- DynamoDB / Aurora – Persistence
- ElastiCache (Redis) – Fast state access
- SQS – Mission queue
- IoT Core – Robot telemetry ingestion
- Kinesis – Streaming data pipeline
- OpenSearch – Log indexing
- Secrets Manager – Secure configuration

---

## Communication Flow

1. User → CloudFront → S3 (frontend)
2. Frontend → API Gateway → ALB → ECS backend
3. Backend → CloudWatch logs
4. Robots (real system) → IoT Core → Processing service → Database
5. Dashboard updates via polling (or WebSockets in production)

---

# CI/CD Strategy (Production)

Using GitHub Actions:

Frontend:
- Build React app
- Deploy to S3
- Invalidate CloudFront

Backend:
- Build Docker image
- Push to ECR
- Deploy to ECS

Automated checks:
- Type checking
- Linting
- Unit tests

---

# Conclusion

This project demonstrates:

- Clean TypeScript structure
- Explicit state machine implementation
- Predictable concurrency behavior
- Thoughtful tradeoffs and assumptions
- Clear production-oriented AWS architecture design

