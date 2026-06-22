import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { _count: { select: { studentProgress: true } } },
  });
  if (!user) {
    res.status(404).json({ code: "NOT_FOUND", message: "User not found" });
    return;
  }
  const { passwordHash, _count, ...safe } = user;
  res.json({ ...safe, labsStarted: _count.studentProgress });
});

router.patch("/onboard", requireAuth, async (req: Request, res: Response) => {
  const { avatar, name } = req.body;
  if (!avatar) {
    res.status(400).json({ code: "BAD_REQUEST", message: "Avatar is required" });
    return;
  }
  const user = await prisma.user.update({
    where: { id: req.user!.userId },
    data: { avatar, name: name || undefined, onboarded: true, lastLoginAt: new Date().toISOString() },
  });
  const { passwordHash, ...safe } = user;
  res.json(safe);
});

router.get("/profile", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: {
      studentProgress: true,
      _count: { select: { studentProgress: true } },
    },
  });
  if (!user) {
    res.status(404).json({ code: "NOT_FOUND", message: "User not found" });
    return;
  }
  const totalChallenges = user.studentProgress.reduce((sum, p) => sum + ((p.completedChallenges as string[]).length ?? 0), 0);
  const { passwordHash, _count, ...safe } = user;
  res.json({ ...safe, labsStarted: _count.studentProgress, totalChallenges });
});

export default router;
