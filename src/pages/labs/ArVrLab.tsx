import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "arvr-lab",
  emoji: "🥽",
  title: "AR/VR Lab",
  tagline: "Beyond Reality",
  description:
    "Step inside history, explore the human body, walk on the moon. The NITAI AR/VR Lab transforms how students learn through fully immersive experiences and creation tools.",
  heroImage: "https://images.unsplash.com/photo-1538388149542-5e24932d11a8?w=1400&q=80",
  gradient: "from-purple-500/20 to-violet-500/10",
  accentColor: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  overview:
    "The NITAI AR/VR Lab equips schools with VR headsets, AR-enabled tablets, and a content creation suite. Students don't just consume immersive content — they create it. From building virtual field trips to designing augmented reality science experiments, this lab develops spatial thinking, digital creativity, and future-ready skills. Included content libraries cover STEM, history, geography, and medical sciences.",
  keyFeatures: [
    { icon: "🎮", title: "VR Headsets", desc: "Class set of standalone VR headsets with curated educational content across all subjects." },
    { icon: "📱", title: "AR on Tablets", desc: "Augmented reality experiences on student tablets — no special hardware required." },
    { icon: "🏗️", title: "VR World Builder", desc: "Students create their own virtual environments using easy drag-and-drop 3D tools." },
    { icon: "🧬", title: "Subject Content Library", desc: "500+ VR/AR experiences in science, history, geography, and engineering." },
    { icon: "🌍", title: "Virtual Field Trips", desc: "Visit the Great Wall, Mars surface, inside volcanoes, and more — from the classroom." },
    { icon: "📐", title: "3D Visualization Tools", desc: "Explore and manipulate complex 3D models in biology, chemistry, and physics." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 4–7)",
      topics: ["What is AR and VR?", "Using VR headsets safely", "Guided virtual field trips", "AR coloring and objects", "Explore 3D science models"],
    },
    {
      level: "Intermediate (Grade 8–10)",
      topics: ["Intro to 3D thinking", "Using VR content editors", "Creating AR markers", "Virtual lab simulations", "Collaborative VR worlds"],
    },
    {
      level: "Advanced (Grade 11+ / College)",
      topics: ["Unity for VR basics", "Designing VR experiences", "AR app prototyping", "Spatial UX design", "Capstone immersive project"],
    },
  ],
  outcomes: [
    "Navigate and learn through immersive VR environments",
    "Create basic AR overlays and markers",
    "Build simple VR worlds using content tools",
    "Develop spatial reasoning and 3D thinking",
    "Apply immersive tech to subject-area learning",
    "Present learning through virtual exhibitions",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1538388149542-5e24932d11a8?w=800&q=80",
    "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400&q=80",
    "https://images.unsplash.com/photo-1552871419-81ba9b1aa9c9?w=400&q=80",
    "https://images.unsplash.com/photo-1659070953831-dd4fa16222fb?w=400&q=80",
  ],
  ageGroup: "Ages 8–22",
  duration: "Modular / Year",
  kitIncludes: ["VR Headsets (Class Set)", "AR-enabled Tablets", "VR Content Library", "3D World Builder", "Teacher Remote Control App", "Charging Station", "Carrying Cases", "Curriculum Guides"],
};

export default function ArVrLabPage() {
  return <LabPageTemplate lab={data} />;
}
