import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db.js";
import { generateToken, requireAuth } from "../middleware/auth.js";
import { signupSchema, signinSchema } from "../validators/auth.js";
import { ZodError } from "zod";

const router = Router();

function formatZodError(err: ZodError): string {
  return err.errors.map((e) => e.message).join("; ");
}

router.post("/signup", async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ code: "VALIDATION_ERROR", message: formatZodError(parsed.error) });
    return;
  }
  const { email, password, name } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(400).json({ code: "BAD_REQUEST", message: "Registration failed" });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name: name || null, lastLoginAt: new Date().toISOString() },
  });
  const token = generateToken({ userId: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, onboarded: user.onboarded, isAdmin: user.isAdmin, totalXp: user.totalXp } });
});

router.post("/signin", async (req: Request, res: Response) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ code: "VALIDATION_ERROR", message: formatZodError(parsed.error) });
    return;
  }
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    res.status(401).json({ code: "UNAUTHENTICATED", message: "Invalid email or password" });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ code: "UNAUTHENTICATED", message: "Invalid email or password" });
    return;
  }
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date().toISOString() } });
  const token = generateToken({ userId: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, onboarded: user.onboarded, isAdmin: user.isAdmin, totalXp: user.totalXp } });
});

router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { _count: { select: { studentProgress: true, enrollments: true } } },
  });
  if (!user) {
    res.status(404).json({ code: "NOT_FOUND", message: "User not found" });
    return;
  }
  res.json({
    ...user,
    passwordHash: undefined,
    labsStarted: user._count.studentProgress,
    enrollmentsCount: user._count.enrollments,
    _count: undefined,
  });
});

export default router;
