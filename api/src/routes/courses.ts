import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { labModule, classLevel, published } = req.query;
  const where: Record<string, unknown> = {};
  if (labModule) where.labModule = labModule as string;
  if (classLevel) where.classLevel = parseInt(classLevel as string);
  if (published !== undefined) where.published = published === "true";
  const courses = await prisma.course.findMany({ where, orderBy: [{ classLevel: "asc" }, { order: "asc" }] });
  res.json(courses);
});

router.get("/:slug", async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({ where: { slug: req.params.slug } });
  if (!course) {
    res.status(404).json({ code: "NOT_FOUND", message: "Course not found" });
    return;
  }
  res.json(course);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({ where: { id: req.params.id } });
  if (!course) {
    res.status(404).json({ code: "NOT_FOUND", message: "Course not found" });
    return;
  }
  res.json(course);
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const course = await prisma.course.create({ data: req.body });
  res.json(course);
});

router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const course = await prisma.course.update({ where: { id: req.params.id }, data: req.body });
  res.json(course);
});

router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  await prisma.course.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

router.post("/seed", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const modules = ["ai", "robotics", "iot", "arvr", "coding", "stem", "creator", "skill", "space", "rnd", "incubation", "ai-tools", "agentic-ai", "automated", "autonomous", "ir50", "future-workforce"];
  const difficulties = ["beginner", "intermediate", "advanced"];
  let created = 0;
  for (const mod of modules) {
    for (let cls = 1; cls <= 12; cls++) {
      const slug = `${mod}-class-${cls}`;
      const exists = await prisma.course.findUnique({ where: { slug } });
      if (!exists) {
        await prisma.course.create({
          data: {
            title: `${mod.charAt(0).toUpperCase() + mod.slice(1)} - Class ${cls}`,
            slug,
            description: `Explore ${mod} concepts designed for Class ${cls}. Hands-on activities aligned with NEP 2020.`,
            labModule: mod,
            classLevel: cls,
            difficulty: difficulties[cls % 3],
            published: true,
            order: cls,
          },
        });
        created++;
      }
    }
  }
  res.json({ created });
});

export default router;
