import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const FREE_TRIAL_LIMIT = 5;

router.get("/progress/:labId", requireAuth, async (req: Request, res: Response) => {
  const progress = await prisma.studentProgress.findUnique({
    where: { userId_labId: { userId: req.user!.userId, labId: req.params.labId } },
  });
  res.json(progress);
});

router.post("/progress/complete", requireAuth, async (req: Request, res: Response) => {
  const { labId, challengeId, xpReward } = req.body;
  if (!labId || !challengeId || xpReward == null) {
    res.status(400).json({ code: "BAD_REQUEST", message: "labId, challengeId, and xpReward required" });
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const existing = await prisma.studentProgress.findUnique({
    where: { userId_labId: { userId: req.user!.userId, labId } },
  });

  if (existing) {
    const challenges = existing.completedChallenges as string[];
    if (challenges.includes(challengeId)) {
      res.json({ alreadyCompleted: true, progress: existing });
      return;
    }
    let streak = existing.streakCount ?? 0;
    if (existing.lastCompletedDate === today) {
      streak = Math.max(streak, 1);
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      streak = existing.lastCompletedDate === yesterday ? streak + 1 : 1;
    }
    const updated = await prisma.studentProgress.update({
      where: { userId_labId: { userId: req.user!.userId, labId } },
      data: {
        completedChallenges: [...challenges, challengeId],
        xpEarned: { increment: xpReward },
        streakCount: streak,
        lastCompletedDate: today,
      },
    });
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { totalXp: { increment: xpReward } },
    });
    res.json({ alreadyCompleted: false, xpEarned: xpReward });
    return;
  }

  await prisma.studentProgress.create({
    data: {
      userId: req.user!.userId,
      labId,
      completedChallenges: [challengeId],
      xpEarned: xpReward,
      streakCount: 1,
      lastCompletedDate: today,
      startedAt: new Date().toISOString(),
    },
  });
  await prisma.user.update({
    where: { id: req.user!.userId },
    data: { totalXp: { increment: xpReward } },
  });
  res.json({ alreadyCompleted: false, xpEarned: xpReward });
});

router.get("/trials/:labId", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user) {
    res.status(404).json({ code: "NOT_FOUND", message: "User not found" });
    return;
  }
  const trial = await prisma.trialUsage.findUnique({
    where: { userId_labId: { userId: req.user!.userId, labId: req.params.labId } },
  });
  const canAccess = (user.trialsUsed ?? 0) < FREE_TRIAL_LIMIT || !!trial;
  res.json({ canAccess, trialsUsed: user.trialsUsed, trialsRemaining: Math.max(0, FREE_TRIAL_LIMIT - (user.trialsUsed ?? 0)) });
});

router.post("/trials/use", requireAuth, async (req: Request, res: Response) => {
  const { labId } = req.body;
  if (!labId) {
    res.status(400).json({ code: "BAD_REQUEST", message: "labId required" });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user) {
    res.status(404).json({ code: "NOT_FOUND", message: "User not found" });
    return;
  }
  if ((user.trialsUsed ?? 0) >= FREE_TRIAL_LIMIT) {
    res.status(400).json({ code: "PRECONDITION_FAILED", message: "No free trials remaining. Please subscribe to continue." });
    return;
  }
  const existing = await prisma.trialUsage.findUnique({
    where: { userId_labId: { userId: req.user!.userId, labId } },
  });
  if (existing) {
    res.json({ success: true, message: "Already used a trial for this lab" });
    return;
  }
  await prisma.trialUsage.create({
    data: { userId: req.user!.userId, labId, usedAt: new Date().toISOString() },
  });
  await prisma.user.update({
    where: { id: req.user!.userId },
    data: { trialsUsed: { increment: 1 } },
  });
  res.json({ success: true, trialsRemaining: FREE_TRIAL_LIMIT - user.trialsUsed - 1 });
});

export default router;
