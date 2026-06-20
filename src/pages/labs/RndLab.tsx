import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "rnd-lab",
  emoji: "🧪",
  title: "R&D & Innovation Lab",
  tagline: "Research. Innovate. Patent.",
  description: "A full R&D lab where students ideate, prototype, publish research, and file patents — the complete innovation pipeline from concept to commercialization.",
  heroImage: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8db?w=1400&q=80",
  gradient: "from-violet-500/20 to-purple-500/10",
  accentColor: "bg-violet-500/10 text-violet-600 border border-violet-500/20",
  ageGroup: "Grade 10–PG",
  duration: "150 hrs/year",
  overview:
    "A full-stack research and development lab where students traverse the complete innovation pipeline — from identifying problems and ideating solutions, to rapid prototyping, peer-reviewed research publishing, and patent filing. With dedicated industry mentors and access to fabrication tools, students learn what it truly means to innovate and bring ideas from concept to commercialization.",
  keyFeatures: [
    {
      title: "Design Thinking Studio",
      desc:
        "Structured sessions using IDEO and Stanford d.school frameworks to define problems, empathize with users, and ideate boldly.",
      icon: "Lightbulb",
    },
    {
      title: "Rapid Prototyping",
      desc:
        "Access to 3D printers, laser cutters, and electronics workbenches to quickly iterate physical and digital prototypes.",
      icon: "Hammer",
    },
    {
      title: "Patent Filing Support",
      desc:
        "Step-by-step guidance on provisional and utility patent applications, prior art searches, and IP documentation.",
      icon: "FileText",
    },
    {
      title: "Research Paper Publishing",
      desc:
        "Mentored publication pipeline for students to submit and publish in peer-reviewed journals and IEEE/Springer conferences.",
      icon: "BookOpen",
    },
    {
      title: "Industry Mentorship",
      desc:
        "One-on-one and group mentorship from R&D leaders at top corporations, research labs, and national institutes.",
      icon: "Users",
    },
    {
      title: "Innovation Competitions",
      desc:
        "Coaching and team formation for Smart India Hackathon, Toycathon, iCAN, and global innovation challenges.",
      icon: "Trophy",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Introduction to the scientific method",
        "Design thinking: empathize and define stages",
        "Literature review and research gap identification",
        "Basic electronics and fabrication safety",
        "Ideation techniques: brainstorming and mind mapping",
        "Observation-based problem statements",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Prototype design and iteration cycles",
        "Data collection, analysis, and visualization",
        "Writing a structured research abstract",
        "IP basics: patents, copyrights, and trade secrets",
        "User testing and feedback incorporation",
        "Preparing for innovation competitions",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "End-to-end patent application filing",
        "Full research paper drafting and submission",
        "Commercialization roadmap and business case",
        "Technology readiness levels (TRL) framework",
        "Presenting research to expert review panels",
        "Capstone: publish or patent a student innovation",
      ],
    },
  ],
  outcomes: [
    "One or more filed patents or published research papers before graduation",
    "Mastery of the full innovation pipeline from concept to commercialization",
    "Competitive readiness for Smart India Hackathon and global challenges",
    "Professional connections with industry R&D mentors and investors",
    "Portfolio of prototypes and documented research projects",
    "Strong foundation for PhD programs, research fellowships, and tech careers",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Professional Electronics Workbench Kit with multimeter and oscilloscope",
    "3D Printing Filament Pack (PLA/PETG) and design software license",
    "Research & Patent Filing Handbook (physical + digital)",
    "Lab Notebook Set with structured experiment templates",
    "Access to IEEE Xplore & Springer digital library (1-year)",
  ],
};

export default function RndLabPage() {
  return <LabPageTemplate lab={data} />;
}
