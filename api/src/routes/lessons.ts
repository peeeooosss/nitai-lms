import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/course/:courseId", async (req: Request, res: Response) => {
  const lessons = await prisma.lesson.findMany({
    where: { courseId: req.params.courseId },
    orderBy: { order: "asc" },
  });
  res.json(lessons);
});

router.get("/:id", async (req: Request, res: Response) => {
  const lesson = await prisma.lesson.findUnique({ where: { id: req.params.id } });
  if (!lesson) {
    res.status(404).json({ code: "NOT_FOUND", message: "Lesson not found" });
    return;
  }
  res.json(lesson);
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const lesson = await prisma.lesson.create({ data: req.body });
  res.json(lesson);
});

router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const lesson = await prisma.lesson.update({ where: { id: req.params.id }, data: req.body });
  res.json(lesson);
});

router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  await prisma.lesson.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
