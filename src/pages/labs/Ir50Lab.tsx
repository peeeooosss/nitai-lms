import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "ir50-lab",
  emoji: "🏭",
  title: "Future Industry Lab IR 5.0",
  tagline: "Human + Machine Harmony",
  description: "Industry Revolution 5.0 — collaborative robotics, digital twins, sustainable manufacturing, and human-centric AI for the factories of the future.",
  heroImage: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1400&q=80",
  gradient: "from-teal-500/20 to-cyan-500/10",
  accentColor: "bg-teal-500/10 text-teal-600 border border-teal-500/20",
  ageGroup: "Grade 10–PG",
  duration: "140 hrs/year",
  overview:
    "Industry Revolution 5.0 is not about replacing humans with machines — it is about combining human creativity and empathy with AI precision and efficiency. Students explore collaborative robots (cobots), sustainable and circular manufacturing, digital twin simulation, and human-centric technology design, preparing them to lead the factories, supply chains, and industrial systems of the very near future.",
  keyFeatures: [
    {
      title: "Collaborative Robots (Cobots)",
      desc:
        "Program and operate Universal Robots cobots that work safely alongside humans on shared assembly and quality-check tasks.",
      icon: "Bot",
    },
    {
      title: "Digital Twin Simulation",
      desc:
        "Create virtual replicas of physical production systems to simulate, optimize, and predict performance before real deployment.",
      icon: "Copy",
    },
    {
      title: "Sustainable Manufacturing",
      desc:
        "Apply circular economy principles, energy optimization, and lifecycle analysis to design low-waste, low-carbon production systems.",
      icon: "Leaf",
    },
    {
      title: "Human-AI Teaming",
      desc:
        "Design workflows where human judgment and AI capabilities are intentionally combined for superior outcomes in complex tasks.",
      icon: "Users",
    },
    {
      title: "Smart Factory Design",
      desc:
        "Plan and present a complete IR 5.0 factory blueprint integrating cobots, IoT sensors, AI quality control, and green energy.",
      icon: "Building",
    },
    {
      title: "IR 5.0 Certification",
      desc:
        "Industry-aligned certification validating readiness for IR 5.0 roles across manufacturing, engineering, and operations.",
      icon: "Award",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "IR 1.0 to IR 5.0: the evolution of industry",
        "Human-centric technology design principles",
        "Introduction to collaborative robotics (cobots)",
        "Sustainability in manufacturing: circular economy basics",
        "IIoT fundamentals: connecting machines to networks",
        "Introduction to digital twin concept and applications",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Cobot programming: UR robots and safety co-existence",
        "Digital twin creation with NVIDIA Omniverse or Siemens NX",
        "AI-powered quality inspection and defect detection",
        "Energy management systems and carbon footprint tracking",
        "Human-AI task allocation and decision augmentation",
        "Smart factory data architecture and edge computing",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Full digital twin deployment for a manufacturing process",
        "Cobot integration with AI vision for adaptive assembly",
        "Lifecycle assessment and sustainability reporting",
        "Supply chain resilience and AI-driven demand forecasting",
        "Ethics of automation: workforce transitions and well-being",
        "Capstone: design and present a complete IR 5.0 factory",
      ],
    },
  ],
  outcomes: [
    "Proficiency in cobot programming and human-robot collaboration design",
    "IR 5.0 certification recognized by industry partners and government bodies",
    "Skills in digital twin and simulation tools used by Siemens and GE",
    "Deep understanding of sustainable manufacturing and green operations",
    "Readiness for roles in smart manufacturing, operations, and industrial AI",
    "Foundation for careers at Industry 4.0/5.0 leaders across automotive, FMCG, and pharma",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Collaborative Robot (Cobot) Training Module with safety sensor ring",
    "Digital Twin Simulation Software License: Siemens NX Student Edition",
    "IIoT Sensor Pack: vibration, temperature, current, and proximity sensors",
    "Sustainability Lab Kit: energy meter, carbon calculator, and lifecycle tools",
    "IR 5.0 Factory Design Workbook with 10 guided capstone scenarios",
  ],
};

export default function Ir50LabPage() {
  return <LabPageTemplate lab={data} />;
}
