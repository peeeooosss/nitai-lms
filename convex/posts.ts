import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let posts;
    if (args.category) {
      posts = await ctx.db
        .query("posts")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .collect();
    } else {
      posts = await ctx.db
        .query("posts")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }
    return posts.filter((p) => p.published);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!post || !post.published) return null;
    return post;
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Only seed if no posts exist
    const existing = await ctx.db.query("posts").take(1);
    if (existing.length > 0) return { seeded: false };

    const samplePosts = [
      {
        title: "NITAI AI Lab Launches at 50+ Schools Across India",
        slug: "nitai-ai-lab-launches-50-schools-india",
        excerpt: "NITAI AI Lab officially inaugurated its state-of-the-art AI & Robotics labs across 50+ schools in Madhya Pradesh, Rajasthan, and Maharashtra — empowering over 10,000 students with hands-on AI education.",
        content: `## A Historic Milestone for AI Education

NITAI AI Lab is proud to announce the successful launch of AI & Robotics labs in over 50 schools across three states in India. This marks a significant step in our mission to democratize AI education and create future-ready leaders from every classroom.

### What's Inside the Labs

Each school lab is equipped with:
- **NITAI Picto Lab** kits for visual programming and robotics
- AI workstations with pre-loaded curriculum
- IoT sensors and microcontroller kits
- AR/VR headsets for immersive learning

### Impact So Far

In just the first semester:
- **10,000+ students** trained in AI fundamentals
- **500+ teachers** upskilled through our Teacher Training program
- **200+ student projects** submitted for the NITAI Innovation Challenge

### What Educators Are Saying

> "The NITAI AI Lab has completely transformed how our students engage with technology. Children who were afraid of computers are now building their own robots!" — Principal, Government School, Bhopal

### Next Steps

We plan to expand to 200+ schools by the end of this academic year. Schools interested in partnering can [contact us](/contact) for a free demo session.`,
        category: "Lab Launches",
        coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
        author: "NITAI AI Lab Team",
        authorRole: "Communications",
        published: true,
        publishedAt: "2025-03-15T09:00:00Z",
        tags: ["AI Lab", "Schools", "India", "Launch"],
        readingTime: 4,
      },
      {
        title: "Teacher Training Program: 1,000 Educators Certified in AI Teaching",
        slug: "teacher-training-1000-educators-ai-certified",
        excerpt: "NITAI AI Lab's flagship Teacher Training Program crossed a major milestone — 1,000 educators are now certified to teach AI, Robotics, and Coding in their classrooms.",
        content: `## Empowering Teachers, Transforming Classrooms

Education is only as good as those who deliver it. That's why NITAI AI Lab has invested heavily in training teachers to become confident, capable AI educators.

### The Program

Our Teacher Training Program is a comprehensive 30-hour certification course covering:
- **AI & Machine Learning Fundamentals** — no coding required
- **Robotics & IoT for Classrooms** — hands-on with NITAI kits
- **Coding with Python & Picto** — block-based to text-based programming
- **Project-Based Learning** methodologies for AI education
- **Assessment & Evaluation** techniques for STEM subjects

### The 1,000 Teacher Milestone

We are proud to announce that as of this month, **1,000 educators** across India have completed and received their NITAI AI Teaching Certificate. These teachers now serve as AI Champions in their schools — training their peers and inspiring their students.

### Testimonials

> "I came into the training not knowing anything about AI. I left feeling like I could teach it to anyone. The hands-on approach made all the difference." — Sunita Sharma, Science Teacher, Indore

### Upcoming Batches

New training batches are available every month online and in-person. [Register here](/teachers-training) to join the next cohort.`,
        category: "Teacher Training",
        coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop",
        author: "Dr. Priya Nair",
        authorRole: "Head of Teacher Training",
        published: true,
        publishedAt: "2025-02-20T08:00:00Z",
        tags: ["Teachers", "Training", "Certification", "AI Education"],
        readingTime: 3,
      },
      {
        title: "14-Year-Old Student Wins National AI Hackathon Using NITAI Lab Skills",
        slug: "student-wins-national-ai-hackathon",
        excerpt: "Arjun Mehta, a Class 9 student from Jabalpur, won the National Student AI Hackathon by building an AI-powered crop disease detector — a project he developed entirely in his school's NITAI AI Lab.",
        content: `## From Classroom to National Stage

When Arjun Mehta first walked into his school's NITAI AI Lab, he had never written a line of code. Eight months later, he stood on a national stage, holding the trophy for Best AI Innovation at the National Student AI Hackathon 2025.

### The Project: AgroGuard

Arjun's project, **AgroGuard**, is a mobile app that uses AI image recognition to detect diseases in crops. A farmer simply photographs a leaf, and the app — trained on thousands of agricultural images — identifies the disease and recommends treatment.

> "My grandfather is a farmer. I wanted to build something that could actually help him and farmers like him." — Arjun Mehta

### The Journey

Arjun spent 3 months in NITAI AI Lab's after-school sessions learning:
1. Python programming fundamentals
2. Image classification with machine learning
3. Mobile app development
4. Dataset creation and model training

His teacher, Mr. Ravi Gupta (a NITAI-certified AI educator), provided guidance throughout the project.

### Recognition

- **1st Place** — National Student AI Hackathon 2025
- Featured in **NDTV Education** and **The Hindu**
- Selected for NITAI's **Global Youth Innovators Program**

This is what NITAI AI Lab is all about — not just teaching AI, but creating tomorrow's problem-solvers.`,
        category: "Student Achievements",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
        author: "NITAI AI Lab Team",
        authorRole: "Student Success",
        published: true,
        publishedAt: "2025-01-10T10:00:00Z",
        tags: ["Student Achievement", "Hackathon", "AI", "Innovation"],
        readingTime: 4,
      },
      {
        title: "AI in Education: Why Every School Needs an AI Lab in 2025",
        slug: "ai-in-education-why-every-school-needs-ai-lab",
        excerpt: "Industry experts and education leaders weigh in on why integrating AI labs into schools is no longer a luxury — it's a necessity for preparing students for the future job market.",
        content: `## The AI Revolution in Education

The World Economic Forum predicts that **65% of children entering primary school today will work in jobs that don't yet exist**. In this rapidly evolving landscape, traditional education systems are struggling to keep pace. AI labs are the answer.

### Why AI Education Matters Now

**1. The Skills Gap is Real**
Companies worldwide are facing a severe shortage of AI-literate workers. By 2030, there will be 97 million new roles in AI and data, but not enough qualified candidates.

**2. Early Exposure Creates Better Outcomes**
Research shows that students exposed to computational thinking and AI concepts before age 16 are 3x more likely to pursue STEM careers.

**3. AI is a Cross-Disciplinary Tool**
AI isn't just for computer scientists. It's transforming healthcare, agriculture, arts, finance, and every other field. Every student needs AI literacy.

### What a Modern AI Lab Includes

A comprehensive AI lab for schools should cover:
- **Programming** (block-based to Python)
- **Machine Learning** (supervised/unsupervised learning concepts)
- **Robotics & IoT** (physical computing)
- **AR/VR** (spatial computing)
- **Ethics of AI** (responsible technology use)

### The NITAI Approach

At NITAI AI Lab, we've designed our curriculum to be **curriculum-integrated**, meaning AI concepts are woven into existing subjects — not taught as a separate, isolated subject. This makes AI education more relevant and impactful.

### Getting Started

Schools that want to set up an AI lab don't need a massive budget or technical expertise. [Contact NITAI AI Lab](/contact) for a free consultation and see how we can help.`,
        category: "Industry News",
        coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop",
        author: "Editorial Team",
        authorRole: "Industry Analysis",
        published: true,
        publishedAt: "2024-12-05T07:00:00Z",
        tags: ["Industry News", "AI Education", "Future of Work", "Schools"],
        readingTime: 5,
      },
      {
        title: "NITAI AI Lab Partners with State Government to Bring AI to 500 Rural Schools",
        slug: "nitai-government-partnership-rural-schools",
        excerpt: "In a landmark public-private partnership, NITAI AI Lab has signed an MOU with the Madhya Pradesh government to install AI & Robotics labs in 500 rural government schools over the next two years.",
        content: `## Making AI Education Accessible to Rural India

Today marks a watershed moment for AI education in India. NITAI AI Lab has signed a Memorandum of Understanding (MOU) with the Government of Madhya Pradesh to bring world-class AI and Robotics education to **500 rural government schools** across the state.

### The Partnership

Under this agreement:
- **500 schools** across MP will receive complete NITAI AI Lab setups
- **5,000 teachers** will be trained through our Teacher Training Program
- **2,50,000 students** will gain access to AI, Robotics, Coding, and STEM education
- All equipment, curriculum, and training will be provided at subsidized rates

### Why Rural Schools?

> "True education reform happens when the child in the most remote village has the same access to cutting-edge technology as the child in the most elite urban school." — Amol Patel, Founder, NITAI AI Lab

AI education must not remain a privilege of the urban elite. This partnership directly addresses that inequity.

### Implementation Plan

**Year 1:** 250 schools, infrastructure setup, teacher training
**Year 2:** Remaining 250 schools, advanced curriculum rollout, student competitions

### A Model for Other States

NITAI AI Lab hopes this partnership serves as a replicable model for other state governments to follow. We are in active discussions with governments in Rajasthan, Uttar Pradesh, and Maharashtra.

For states, NGOs, or districts interested in similar partnerships, [reach out to our team](/contact).`,
        category: "Lab Launches",
        coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
        author: "NITAI AI Lab Team",
        authorRole: "Partnerships",
        published: true,
        publishedAt: "2024-11-18T11:00:00Z",
        tags: ["Government", "Partnership", "Rural Schools", "Lab Launch"],
        readingTime: 4,
      },
      {
        title: "The Rise of Agentic AI: What Schools Need to Teach in 2025",
        slug: "rise-of-agentic-ai-what-schools-need-to-teach",
        excerpt: "Agentic AI — AI systems that can autonomously plan and execute multi-step tasks — is transforming every industry. Here's how schools can prepare students for this new paradigm.",
        content: `## What is Agentic AI?

Agentic AI refers to AI systems that can autonomously plan, reason, and take actions to complete complex, multi-step goals — without constant human intervention. Think of an AI agent that can research a topic, write a report, send emails, book meetings, and manage schedules all on its own.

This is no longer science fiction. Tools like AutoGPT, CrewAI, and enterprise AI agents are already being deployed in businesses worldwide.

### Why Schools Must Teach This Now

**The Job Market is Changing Fast**
By 2026, AI agents will handle significant portions of routine knowledge work. Students who understand how to work with, direct, and build AI agents will have a massive advantage.

**Critical Thinking Becomes More Important**
As AI handles execution, humans become the strategic layer. Students need to learn how to formulate the right goals, evaluate AI outputs critically, and maintain ethical oversight.

**New Career Paths are Emerging**
"Prompt Engineer", "AI Agent Designer", and "Human-AI Collaboration Specialist" are already listed on major job boards.

### NITAI AI Lab's Approach

Our **Agentic AI Lab** curriculum covers:
1. Understanding LLMs and how agents are built
2. Prompt engineering and task decomposition
3. Building simple AI workflows with no-code tools
4. Ethics of autonomous systems
5. Real-world agent projects for students

### The Bottom Line

The schools that teach Agentic AI today will produce the workforce leaders of tomorrow. NITAI AI Lab is here to help make that transition smooth and accessible.

[Learn more about our Agentic AI Lab →](/labs/agentic-ai)`,
        category: "Industry News",
        coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop",
        author: "Editorial Team",
        authorRole: "Technology Insights",
        published: true,
        publishedAt: "2024-10-30T09:00:00Z",
        tags: ["Agentic AI", "Future Skills", "AI Education", "Industry"],
        readingTime: 5,
      },
    ];

    for (const post of samplePosts) {
      await ctx.db.insert("posts", post);
    }
    return { seeded: true, count: samplePosts.length };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    coverImage: v.optional(v.string()),
    author: v.string(),
    authorRole: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.string()),
    tags: v.array(v.string()),
    readingTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ message: "Not authenticated", code: "UNAUTHENTICATED" });
    }
    return await ctx.db.insert("posts", args);
  },
});
