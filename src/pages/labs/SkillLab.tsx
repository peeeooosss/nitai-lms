import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "skill-lab",
  emoji: "🎯",
  title: "Skill Lab",
  tagline: "Future-Ready Skills",
  description:
    "Develop the 21st-century skills that no algorithm can replace. Critical thinking, communication, leadership, and entrepreneurship — the Skill Lab prepares students for life.",
  heroImage: "https://images.unsplash.com/photo-1705579610984-910ad33fe2db?w=1400&q=80",
  gradient: "from-indigo-500/20 to-blue-500/10",
  accentColor: "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20",
  overview:
    "As automation and AI reshape every industry, the distinctly human skills — creative thinking, collaboration, communication, and adaptability — become more valuable than ever. The NITAI Skill Lab is a structured program that develops these competencies through immersive workshops, debates, business simulations, design thinking sprints, and leadership challenges. It is designed for secondary and post-secondary students and integrates seamlessly with all other NITAI labs.",
  keyFeatures: [
    { icon: "🧩", title: "Design Thinking", desc: "Structured design thinking methodology workshops applied to real community and global challenges." },
    { icon: "🗣️", title: "Public Speaking & Debate", desc: "Structured communication workshops, debate formats, and presentation skills training." },
    { icon: "💡", title: "Entrepreneurship Program", desc: "Business ideation, lean canvas, pitching, and mini-startup simulation activities." },
    { icon: "🤝", title: "Team Leadership", desc: "Experiential leadership challenges, team dynamics, and conflict resolution skills." },
    { icon: "🌐", title: "Global Citizenship", desc: "Understanding global issues, SDGs, and taking local action through student-led projects." },
    { icon: "🧠", title: "Critical & Analytical Thinking", desc: "Logic puzzles, Socratic seminars, and evidence-based argumentation workshops." },
  ],
  curriculum: [
    {
      level: "Foundation (Grade 7–9)",
      topics: ["Growth mindset", "Communication basics", "Teamwork challenges", "Problem-solving frameworks", "Intro to design thinking"],
    },
    {
      level: "Intermediate (Grade 10–12)",
      topics: ["Advanced design thinking", "Public speaking", "Entrepreneurship basics", "Leadership styles", "Social impact projects"],
    },
    {
      level: "Advanced (College / University)",
      topics: ["Innovation management", "Venture pitch skills", "Systems thinking", "Cross-cultural collaboration", "Capstone leadership project"],
    },
  ],
  outcomes: [
    "Apply design thinking to solve real problems",
    "Communicate ideas clearly and persuasively",
    "Lead and collaborate in diverse teams",
    "Develop an entrepreneurial and growth mindset",
    "Navigate complex problems with analytical reasoning",
    "Build empathy and global citizenship awareness",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1705579610984-910ad33fe2db?w=800&q=80",
    "https://images.unsplash.com/photo-1723987135977-ae935608939e?w=400&q=80",
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=400&q=80",
    "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?w=400&q=80",
  ],
  ageGroup: "Ages 12–25",
  duration: "Semester / Year",
  kitIncludes: ["Workshop Facilitator Guides", "Design Thinking Toolkits", "Debate & Presentation Materials", "Business Simulation Cards", "Leadership Challenge Kits", "Assessment Rubrics", "Student Journals", "Certificate Program"],
};

export default function SkillLabPage() {
  return <LabPageTemplate lab={data} />;
}
