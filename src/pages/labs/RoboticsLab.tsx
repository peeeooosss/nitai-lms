import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "robotics-lab",
  emoji: "⚙️",
  title: "Robotics Lab",
  tagline: "Build. Program. Innovate.",
  description:
    "From simple mechanical assemblies to fully autonomous robots — NITAI Robotics Lab delivers hands-on engineering education that sparks curiosity and builds real technical skills.",
  heroImage: "https://images.unsplash.com/photo-1743677077216-00a458eff9e0?w=1400&q=80",
  gradient: "from-orange-500/20 to-red-500/10",
  accentColor: "bg-orange-500/10 text-orange-600 border border-orange-500/20",
  overview:
    "The NITAI Robotics Lab is a complete robotics education solution for schools and universities. Students learn mechanical design, electronics, and programming by building real working robots. The curriculum progresses from basic servo-controlled machines to competition-grade autonomous bots. Integrated with NITAI Python Lab and supported by certified kits, every session is a memorable building experience.",
  keyFeatures: [
    { icon: "🔩", title: "Hardware Kits", desc: "Modular, durable robotics kits including servo motors, sensors, chassis, and controllers for every level." },
    { icon: "🖥️", title: "Visual Programming", desc: "Block-based and Python coding environment designed specifically for robot control." },
    { icon: "🎮", title: "Competition Ready", desc: "Kits and curriculum aligned with WRO, FLL, and other national and international robotics competitions." },
    { icon: "📡", title: "Sensor Integration", desc: "Ultrasonic, IR, color, and gyro sensors for building smart, responsive robots." },
    { icon: "🤝", title: "Team Challenges", desc: "Collaborative mission-based challenges that develop teamwork and problem-solving skills." },
    { icon: "📋", title: "Teacher Dashboard", desc: "Real-time monitoring of student progress, code submissions, and robot test runs." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 4–6)",
      topics: ["What is a robot?", "Simple mechanisms", "Motors and movement", "Intro to block coding", "Build a line-follower"],
    },
    {
      level: "Intermediate (Grade 7–10)",
      topics: ["Sensor programming", "Conditional logic", "Object avoidance", "Maze solving", "Basic autonomous systems"],
    },
    {
      level: "Advanced (Grade 11+ / College)",
      topics: ["Python for robotics", "PID control", "Computer vision integration", "Multi-robot systems", "Competition project build"],
    },
  ],
  outcomes: [
    "Design and assemble functional robots from kits",
    "Program robot behavior using block coding and Python",
    "Integrate multiple sensors for autonomous decision-making",
    "Apply engineering design thinking",
    "Compete in robotics competitions with confidence",
    "Document and present engineering projects",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1743677077216-00a458eff9e0?w=800&q=80",
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=400&q=80",
    "https://images.unsplash.com/photo-1653566031536-4d1b6a9da15e?w=400&q=80",
    "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?w=400&q=80",
  ],
  ageGroup: "Ages 8–22",
  duration: "Academic Year",
  kitIncludes: ["Modular Robotics Kit", "Controller Board", "Sensor Pack (6 types)", "Wheels & Chassis", "Python IDE License", "Competition Rulebooks", "Teacher Manual", "Spare Parts Pack"],
};

export default function RoboticsLabPage() {
  return <LabPageTemplate lab={data} />;
}
