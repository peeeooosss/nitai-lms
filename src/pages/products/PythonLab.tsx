import { Code2 } from "lucide-react";
import ProductPageTemplate from "./_components/ProductPageTemplate.tsx";
import type { ProductPageData } from "./_components/ProductPageTemplate.tsx";

const data: ProductPageData = {
  id: "python-lab",
  icon: <Code2 className="w-8 h-8" />,
  title: "NITAI Python Lab",
  subtitle: "Professional Python IDE Built for Students",
  description:
    "A browser-based Python coding environment with AI assistance, hardware integration, a 100+ project library, and real-time collaboration — designed specifically for education.",
  heroGradient: "from-orange-500/10 via-yellow-500/5 to-background",
  overview:
    "NITAI Python Lab is where students graduate from block coding into real programming. It is a browser-based Python IDE with intelligent code suggestions, instant execution, built-in debugging, and a curated library of 100+ projects covering data science, AI, web development, and hardware programming. Students can plug in an Arduino or Raspberry Pi and control it from the same environment. Real-time collaboration features let pairs or groups code together — ideal for classroom learning.",
  features: [
    { icon: "🧠", title: "AI Code Assistant", desc: "Intelligent suggestions, error explanations in plain English, and hints to help students learn, not just fix bugs." },
    { icon: "⚡", title: "Instant Execution", desc: "Run Python code in the browser instantly — no setup, no installation, no waiting." },
    { icon: "🔌", title: "Hardware Integration", desc: "Connect Arduino, Raspberry Pi, and NITAI robotics kits directly via USB or WiFi." },
    { icon: "📚", title: "Project Library", desc: "100+ guided projects in data science, AI, games, web scraping, and robotics." },
    { icon: "👥", title: "Real-Time Collaboration", desc: "Students and teachers can code together in the same editor, perfect for pair programming." },
    { icon: "🐛", title: "Visual Debugger", desc: "Step through code line-by-line with a visual debugger that shows variable states." },
    { icon: "📊", title: "Progress Analytics", desc: "Detailed tracking of coding hours, project completions, errors, and skill growth." },
    { icon: "🏆", title: "Leaderboard & Badges", desc: "Gamified achievement system to recognize and celebrate student milestones." },
  ],
  screenshots: [
    "https://images.unsplash.com/photo-1529429612779-c8e40ef2f36d?w=800&q=80",
    "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=400&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?w=400&q=80",
    "https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?w=400&q=80",
  ],
  plans: [
    {
      name: "Basic",
      price: "₹1,499/mo",
      features: ["Up to 30 students", "50 projects", "Basic AI hints", "Email support", "1 teacher account"],
    },
    {
      name: "Pro",
      price: "₹3,499/mo",
      features: ["Up to 120 students", "100+ projects", "Full AI assistant", "Hardware integration", "Collaboration tools", "5 teacher accounts", "Priority support"],
    },
    {
      name: "Institution",
      price: "Custom",
      features: ["Unlimited students", "Custom project creation", "LMS integration", "SIS sync", "API access", "Dedicated trainer", "Custom domain"],
    },
  ],
  ageGroup: "Ages 12+",
  badge: "Python IDE",
};

export default function PythonLabPage() {
  return <ProductPageTemplate product={data} />;
}
