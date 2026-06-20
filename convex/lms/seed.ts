import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

const SAMPLE_COURSES = [
  // AI Lab
  { title: "Introduction to Artificial Intelligence", slug: "ai-intro-class6", description: "Discover what AI is, how machines learn, and explore fun real-world applications like image recognition and voice assistants.", labModule: "ai", classLevel: 6, difficulty: "beginner", duration: "6 hours", order: 1 },
  { title: "Machine Learning Fundamentals", slug: "ai-ml-class8", description: "Understand supervised and unsupervised learning with hands-on experiments using simple datasets.", labModule: "ai", classLevel: 8, difficulty: "intermediate", duration: "10 hours", order: 2 },
  { title: "Neural Networks & Deep Learning", slug: "ai-deep-learning-class10", description: "Build and train neural networks from scratch. Explore CNNs, RNNs, and real-world AI applications.", labModule: "ai", classLevel: 10, difficulty: "advanced", duration: "14 hours", order: 3 },
  { title: "AI for Kids: Smart Machines", slug: "ai-kids-class3", description: "A fun introduction to artificial intelligence for young learners. Learn how machines think using games and stories.", labModule: "ai", classLevel: 3, difficulty: "beginner", duration: "4 hours", order: 4 },

  // Coding Lab
  { title: "Scratch Programming Basics", slug: "coding-scratch-class4", description: "Create animated stories and interactive games using Scratch. Learn loops, conditions, and events visually.", labModule: "coding", classLevel: 4, difficulty: "beginner", duration: "5 hours", order: 1 },
  { title: "Python for Beginners", slug: "coding-python-class7", description: "Start your Python journey. Write scripts, work with variables, loops, and build your first mini-projects.", labModule: "coding", classLevel: 7, difficulty: "beginner", duration: "8 hours", order: 2 },
  { title: "Web Development with HTML & CSS", slug: "coding-web-class9", description: "Build beautiful websites from scratch. Learn HTML structure, CSS styling, and responsive design.", labModule: "coding", classLevel: 9, difficulty: "intermediate", duration: "12 hours", order: 3 },
  { title: "Advanced Python & Data Structures", slug: "coding-python-adv-class11", description: "Master Python with OOP, file handling, and data structures. Build real-world projects.", labModule: "coding", classLevel: 11, difficulty: "advanced", duration: "16 hours", order: 4 },

  // Robotics Lab
  { title: "Introduction to Robotics", slug: "robotics-intro-class5", description: "Build your first robot! Learn about motors, sensors, and basic programming to bring machines to life.", labModule: "robotics", classLevel: 5, difficulty: "beginner", duration: "6 hours", order: 1 },
  { title: "Arduino Programming & Electronics", slug: "robotics-arduino-class8", description: "Program microcontrollers and build electronic circuits. Create projects that interact with the physical world.", labModule: "robotics", classLevel: 8, difficulty: "intermediate", duration: "10 hours", order: 2 },
  { title: "Autonomous Robot Navigation", slug: "robotics-autonomous-class11", description: "Design robots that sense their environment and make decisions. Explore PID control and path planning.", labModule: "robotics", classLevel: 11, difficulty: "advanced", duration: "14 hours", order: 3 },

  // IoT Lab
  { title: "IoT Basics: Connected World", slug: "iot-basics-class7", description: "Explore how everyday objects connect to the internet. Build simple sensor projects and visualize data.", labModule: "iot", classLevel: 7, difficulty: "beginner", duration: "7 hours", order: 1 },
  { title: "Smart Home Automation", slug: "iot-smarthome-class9", description: "Design and build smart home systems. Control lights, temperature, and security using IoT devices.", labModule: "iot", classLevel: 9, difficulty: "intermediate", duration: "10 hours", order: 2 },

  // STEM Lab
  { title: "STEM Foundations: Science & Math", slug: "stem-foundations-class4", description: "Explore the interconnection of Science, Technology, Engineering, and Math through experiments and challenges.", labModule: "stem", classLevel: 4, difficulty: "beginner", duration: "5 hours", order: 1 },
  { title: "Physics & Engineering Projects", slug: "stem-physics-class9", description: "Apply physics principles to real engineering challenges. Build bridges, catapults, and energy circuits.", labModule: "stem", classLevel: 9, difficulty: "intermediate", duration: "9 hours", order: 2 },
  { title: "Advanced STEM Research Methods", slug: "stem-research-class12", description: "Conduct independent research projects. Learn scientific methodology, data analysis, and technical writing.", labModule: "stem", classLevel: 12, difficulty: "advanced", duration: "20 hours", order: 3 },

  // AR/VR Lab
  { title: "Introduction to AR & VR", slug: "arvr-intro-class8", description: "Step into the world of augmented and virtual reality. Understand the technology and create your first AR experience.", labModule: "arvr", classLevel: 8, difficulty: "beginner", duration: "6 hours", order: 1 },
  { title: "Building VR Environments", slug: "arvr-build-class11", description: "Design immersive virtual reality scenes. Use 3D modeling and VR development tools to create interactive worlds.", labModule: "arvr", classLevel: 11, difficulty: "advanced", duration: "14 hours", order: 2 },

  // Creator Lab
  { title: "Digital Art & Design Basics", slug: "creator-art-class5", description: "Express your creativity digitally. Learn illustration, color theory, and design principles using digital tools.", labModule: "creator", classLevel: 5, difficulty: "beginner", duration: "6 hours", order: 1 },
  { title: "Video Production & Storytelling", slug: "creator-video-class8", description: "Script, film, and edit your own videos. Learn storytelling techniques and professional editing workflows.", labModule: "creator", classLevel: 8, difficulty: "intermediate", duration: "10 hours", order: 2 },

  // Space Lab
  { title: "Our Solar System", slug: "space-solar-class5", description: "Journey through the solar system. Learn about planets, moons, and the science behind space exploration.", labModule: "space", classLevel: 5, difficulty: "beginner", duration: "5 hours", order: 1 },
  { title: "Rocketry & Space Engineering", slug: "space-rocketry-class10", description: "Understand the physics of rocketry. Design, simulate, and test rocket models using engineering principles.", labModule: "space", classLevel: 10, difficulty: "intermediate", duration: "10 hours", order: 2 },

  // Agentic AI
  { title: "AI Agents & Automation", slug: "agentic-ai-intro-class10", description: "Discover how AI agents work autonomously to complete tasks. Build simple agents that browse, search, and act.", labModule: "agentic-ai", classLevel: 10, difficulty: "intermediate", duration: "10 hours", order: 1 },

  // Future Workforce
  { title: "Skills for the Future", slug: "future-workforce-class9", description: "Prepare for tomorrow's careers. Develop critical thinking, collaboration, and digital skills for a rapidly changing world.", labModule: "future-workforce", classLevel: 9, difficulty: "beginner", duration: "8 hours", order: 1 },
  { title: "Entrepreneurship & Innovation", slug: "future-workforce-entrepreneur-class11", description: "Think like an entrepreneur. Learn design thinking, startup basics, and how to pitch your ideas.", labModule: "future-workforce", classLevel: 11, difficulty: "intermediate", duration: "12 hours", order: 2 },
];

export const seedCourses = mutation({
  args: { force: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) throw new ConvexError({ message: "Forbidden", code: "FORBIDDEN" });

    let created = 0;
    for (const course of SAMPLE_COURSES) {
      // Check if slug already exists
      const existing = await ctx.db
        .query("courses")
        .withIndex("by_slug", (q) => q.eq("slug", course.slug))
        .unique();
      if (existing && !args.force) continue;
      if (existing && args.force) {
        await ctx.db.patch(existing._id, { ...course, published: true });
      } else {
        await ctx.db.insert("courses", { ...course, published: true });
        created++;
      }
    }
    return { created, total: SAMPLE_COURSES.length };
  },
});
