import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, phone, organization, organizationType, subject, message } = req.body;
  if (!name || !email || !organization || !message) {
    res.status(400).json({ code: "BAD_REQUEST", message: "Name, email, organization, and message are required" });
    return;
  }
  const inquiry = await prisma.inquiry.create({
    data: { name, email, phone, organization, organizationType, subject, message, status: "new" },
  });
  res.json(inquiry);
});

router.get("/admin", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const { status, organizationType } = req.query;
  const where: Record<string, unknown> = {};
  if (status) where.status = status as string;
  if (organizationType) where.organizationType = organizationType as string;
  const inquiries = await prisma.inquiry.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json(inquiries);
});

router.get("/stats", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const all = await prisma.inquiry.findMany();
  const total = all.length;
  const byStatus = { new: all.filter((i) => i.status === "new").length, read: all.filter((i) => i.status === "read").length, replied: all.filter((i) => i.status === "replied").length };
  const byType: Record<string, number> = {};
  for (const i of all) byType[i.organizationType] = (byType[i.organizationType] ?? 0) + 1;
  res.json({ total, byStatus, byType });
});

router.patch("/:id/status", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const inquiry = await prisma.inquiry.update({ where: { id: req.params.id }, data: { status: req.body.status } });
  res.json(inquiry);
});

router.post("/make-admin", requireAuth, async (req: Request, res: Response) => {
  await prisma.user.update({ where: { id: req.user!.userId }, data: { isAdmin: true } });
  res.json({ success: true });
});

router.get("/list", async (_req: Request, res: Response) => {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  res.json(inquiries);
});

export default router;
