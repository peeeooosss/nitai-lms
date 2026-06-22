import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import enrollmentRoutes from "./routes/enrollments.js";
import postRoutes from "./routes/posts.js";
import inquiryRoutes from "./routes/inquiries.js";
import studentRoutes from "./routes/students.js";
import { prisma } from "./db.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/students", studentRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (e) {
    res.status(503).json({ status: "error", database: "disconnected", error: (e as Error).message });
  }
});

export default app;
