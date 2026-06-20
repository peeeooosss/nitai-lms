import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "coding-lab",
  emoji: "💻",
  title: "Coding Lab",
  tagline: "Write Tomorrow",
  description:
    "From drag-and-drop blocks to professional-grade web and app development — the NITAI Coding Lab builds real programming skills at every age and level.",
  heroImage: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=1400&q=80",
  gradient: "from-yellow-500/20 to-amber-500/10",
  accentColor: "bg-yellow-500/10 text-amber-600 border border-yellow-500/20",
  overview:
    "The NITAI Coding Lab takes a scaffolded approach to programming education — beginning with visual block coding for young learners and progressing through Python, web development, app creation, and software engineering fundamentals. Every level uses project-based learning so students build something real at every stage. The lab includes NITAI Picto Lab for beginners and NITAI Python Lab for intermediate to advanced students.",
  keyFeatures: [
    { icon: "🧩", title: "Block to Text Transition", desc: "Smooth transition from visual block coding (Picto Lab) to text-based Python programming." },
    { icon: "🌐", title: "Web Dev Track", desc: "HTML, CSS, JavaScript, and React basics for students aged 14 and above." },
    { icon: "📲", title: "App Development", desc: "Build functional Android/iOS-ready apps using MIT App Inventor and React Native basics." },
    { icon: "🎮", title: "Game Dev with Python", desc: "Build simple 2D games using PyGame to reinforce core programming concepts." },
    { icon: "🤖", title: "Hardware Integration", desc: "Connect Python code to physical robots, IoT devices, and Raspberry Pi projects." },
    { icon: "👥", title: "Pair Programming", desc: "Structured pair programming sessions that build collaboration and code review skills." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 3–6)",
      topics: ["Intro to Scratch/Picto Lab", "Sequences and loops", "Events and conditionals", "Simple animations", "First game project"],
    },
    {
      level: "Intermediate (Grade 7–10)",
      topics: ["Python fundamentals", "Variables and functions", "Lists and dictionaries", "File handling", "Mini project: quiz app"],
    },
    {
      level: "Advanced (Grade 11+ / College)",
      topics: ["OOP in Python", "Web APIs and JSON", "HTML/CSS/JS basics", "Database-backed apps", "Full-stack mini project"],
    },
  ],
  outcomes: [
    "Progress from visual to text-based programming confidently",
    "Build functional Python programs and scripts",
    "Create interactive web pages and apps",
    "Develop debugging and problem-solving skills",
    "Understand software development workflows",
    "Complete a portfolio of coding projects",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&q=80",
    "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?w=400&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?w=400&q=80",
    "https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?w=400&q=80",
  ],
  ageGroup: "Ages 7–22",
  duration: "Academic Year",
  kitIncludes: ["NITAI Picto Lab License", "NITAI Python Lab License", "Coding Challenges Library", "Project Templates", "Student Progress Reports", "Teacher Dashboard", "Certificates", "24/7 Online Support"],
};

export default function CodingLabPage() {
  return <LabPageTemplate lab={data} />;
}
