import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "stem-lab",
  emoji: "🔬",
  title: "STEM Lab",
  tagline: "Experiment. Discover. Excel.",
  description:
    "An integrated Science, Technology, Engineering, and Mathematics lab that brings classroom theory to life through experiments, design challenges, and real-world projects.",
  heroImage: "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=1400&q=80",
  gradient: "from-green-500/20 to-lime-500/10",
  accentColor: "bg-green-500/10 text-green-600 border border-green-500/20",
  overview:
    "The NITAI STEM Lab is not just a science lab — it is a complete innovation ecosystem. Students learn to think like scientists and engineers through guided experiments, open-ended design challenges, data analysis, and mathematical modeling. The lab bridges every core subject: physics, chemistry, biology, and mathematics, all united under the engineering design process. It is perfect for K-12 and undergraduate programs.",
  keyFeatures: [
    { icon: "⚗️", title: "Science Experiments", desc: "200+ hands-on physics, chemistry, and biology experiments with complete materials." },
    { icon: "📐", title: "Engineering Challenges", desc: "Open-ended design-build-test challenges inspired by real engineering problems." },
    { icon: "📊", title: "Data Analysis Tools", desc: "Digital probes and graphing tools for real-time data collection and analysis." },
    { icon: "🌍", title: "Environmental Projects", desc: "Projects focused on sustainability, climate, and environmental solutions." },
    { icon: "🧮", title: "Math Modeling", desc: "Connect mathematical models to physical experiments and real-world data." },
    { icon: "🏗️", title: "Maker Station", desc: "Equipped with basic tools, materials, and a mini 3D printer for prototyping." },
  ],
  curriculum: [
    {
      level: "Primary (Grade 3–5)",
      topics: ["Scientific method basics", "Simple machines", "States of matter", "Plants and ecosystems", "Measurement and data"],
    },
    {
      level: "Middle School (Grade 6–8)",
      topics: ["Forces and motion", "Chemical reactions", "Electricity basics", "Engineering design process", "Environmental data projects"],
    },
    {
      level: "Secondary (Grade 9–12)",
      topics: ["Advanced physics labs", "Organic chemistry basics", "Biology with microscopy", "Statistical analysis", "STEM capstone project"],
    },
  ],
  outcomes: [
    "Apply the scientific method to real questions",
    "Design and test engineering solutions",
    "Collect, graph, and interpret experimental data",
    "Make connections across science, math, and technology",
    "Develop critical thinking and research skills",
    "Present findings through lab reports and presentations",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1653566031536-4d1b6a9da15e?w=400&q=80",
    "https://images.unsplash.com/photo-1705579610984-910ad33fe2db?w=400&q=80",
    "https://images.unsplash.com/photo-1581094284541-0a41371083aa?w=400&q=80",
  ],
  ageGroup: "Ages 7–22",
  duration: "Academic Year",
  kitIncludes: ["Experiment Materials Kit", "Digital Probes & Sensors", "Mini 3D Printer", "Microscopes (Class Set)", "Engineering Materials Pack", "Data Analysis Software", "Lab Safety Equipment", "Teacher Experiment Guides"],
};

export default function StemLabPage() {
  return <LabPageTemplate lab={data} />;
}
