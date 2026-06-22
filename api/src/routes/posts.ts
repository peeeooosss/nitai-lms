import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;
  const where: Record<string, unknown> = { published: true };
  if (category) where.category = category as string;
  const posts = await prisma.post.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json(posts);
});

router.get("/:slug", async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({ where: { slug: req.params.slug } });
  if (!post) {
    res.status(404).json({ code: "NOT_FOUND", message: "Post not found" });
    return;
  }
  res.json(post);
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  const post = await prisma.post.create({ data: req.body });
  res.json(post);
});

const SAMPLE_POSTS = [
  { title: "Launching NITAI AI Lab 2.0", slug: "launching-nitai-ai-lab-2", excerpt: "New AI Lab 2.0 with advanced ML modules.", content: "# AI Lab 2.0\n\nWe're excited to announce the launch of AI Lab 2.0...", category: "Lab Launches", author: "NITAI Team", authorRole: "Product Team", published: true, publishedAt: new Date().toISOString(), tags: ["ai-lab", "launch"], readingTime: 3 },
  { title: "Teacher Training: AI for Educators", slug: "teacher-training-ai-educators", excerpt: "Empowering teachers with AI skills.", content: "# AI for Educators\n\nOur teacher training program...", category: "Teacher Training", author: "NITAI Team", authorRole: "Training Team", published: true, publishedAt: new Date().toISOString(), tags: ["training", "teachers"], readingTime: 5 },
  { title: "Student Spotlight: Robotics Champions", slug: "student-spotlight-robotics", excerpt: "Students win national robotics competition.", content: "# Robotics Champions\n\nCongratulations to our students...", category: "Student Achievements", author: "NITAI Team", authorRole: "Editorial Team", published: true, publishedAt: new Date().toISOString(), tags: ["robotics", "achievement"], readingTime: 4 },
  { title: "NITAI Partners with Ministry of Education", slug: "partnership-ministry-education", excerpt: "Strategic partnership for STEM education.", content: "# Ministry Partnership\n\nNITAI has partnered with the Ministry of Education...", category: "Industry News", author: "NITAI Team", authorRole: "Leadership", published: true, publishedAt: new Date().toISOString(), tags: ["partnership", "ministry"], readingTime: 6 },
];

router.post("/seed", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user?.isAdmin) {
    res.status(403).json({ code: "FORBIDDEN", message: "Admin access required" });
    return;
  }
  let created = 0;
  for (const post of SAMPLE_POSTS) {
    const exists = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (!exists) {
      await prisma.post.create({ data: post as any });
      created++;
    }
  }
  res.json({ created });
});

export default router;
