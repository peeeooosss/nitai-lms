import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/my", requireAuth, async (req: Request, res: Response) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: req.user!.userId },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
  });
  res.json(enrollments);
});

router.get("/check/:courseId", requireAuth, async (req: Request, res: Response) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: req.user!.userId, courseId: req.params.courseId } },
  });
  res.json(!!enrollment);
});

router.post("/enroll/:courseId", requireAuth, async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({ where: { id: req.params.courseId } });
  if (!course) {
    res.status(404).json({ code: "NOT_FOUND", message: "Course not found" });
    return;
  }
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: req.user!.userId, courseId: req.params.courseId } },
  });
  if (existing) {
    res.json(existing);
    return;
  }
  const enrollment = await prisma.enrollment.create({
    data: { userId: req.user!.userId, courseId: req.params.courseId, enrolledAt: new Date().toISOString() },
  });
  res.json(enrollment);
});

router.delete("/unenroll/:courseId", requireAuth, async (req: Request, res: Response) => {
  await prisma.enrollment.deleteMany({
    where: { userId: req.user!.userId, courseId: req.params.courseId },
  });
  res.json({ success: true });
});

router.get("/progress/:courseId", requireAuth, async (req: Request, res: Response) => {
  const lessons = await prisma.lesson.findMany({
    where: { courseId: req.params.courseId },
    orderBy: { order: "asc" },
  });
  const completed = await prisma.lessonProgress.findMany({
    where: { userId: req.user!.userId, courseId: req.params.courseId },
  });
  const completedIds = new Set(completed.map((lp) => lp.lessonId));
  res.json({
    total: lessons.length,
    completed: completed.length,
    lessons: lessons.map((l) => ({ ...l, completed: completedIds.has(l.id) })),
  });
});

router.post("/complete-lesson", requireAuth, async (req: Request, res: Response) => {
  const { lessonId, courseId } = req.body;
  if (!lessonId || !courseId) {
    res.status(400).json({ code: "BAD_REQUEST", message: "lessonId and courseId required" });
    return;
  }
  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: req.user!.userId, lessonId } },
  });
  if (existing) {
    res.json(existing);
    return;
  }
  const progress = await prisma.lessonProgress.create({
    data: { userId: req.user!.userId, lessonId, courseId, completedAt: new Date().toISOString() },
  });
  res.json(progress);
});

export default router;
