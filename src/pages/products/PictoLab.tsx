import { Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import ProductPageTemplate from "./_components/ProductPageTemplate.tsx";
import type { ProductPageData } from "./_components/ProductPageTemplate.tsx";

const data: ProductPageData = {
  id: "picto-lab",
  icon: <Monitor className="w-8 h-8" />,
  title: "NITAI Picto Lab",
  subtitle: "Visual Block Programming for Young Learners",
  description:
    "A picture-based, drag-and-drop programming environment that makes coding completely accessible for children aged 6–14 — no keyboard required to start.",
  heroGradient: "from-cyan-500/10 via-blue-500/5 to-background",
  overview:
    "NITAI Picto Lab is the most intuitive programming environment for young learners. Using a visual, picture-based block interface, children as young as 6 can create animations, games, and control robots — without any typing. The platform is web-based, bilingual (supports 10+ languages), and comes with 200+ guided projects aligned to school curricula globally. Progress tracking, teacher dashboards, and gamified achievement badges keep students motivated all year long.",
  features: [
    { icon: "🖼️", title: "Picture-Based Blocks", desc: "Icons and visuals replace text so young learners can code intuitively without reading barriers." },
    { icon: "🤖", title: "Robot Control", desc: "Control NITAI robotics kits directly from Picto Lab — students see code come to life immediately." },
    { icon: "🎮", title: "Gamified Learning", desc: "Badges, points, and level-up system that keeps students engaged and motivated." },
    { icon: "🌍", title: "10+ Languages", desc: "Platform interface and content available in English, Hindi, Arabic, Spanish, and 6 more languages." },
    { icon: "📊", title: "Teacher Dashboard", desc: "Real-time view of every student's progress, submissions, and time spent on tasks." },
    { icon: "📱", title: "Works Everywhere", desc: "Browser-based and tablet-optimized. No installation required on any device." },
    { icon: "🧩", title: "200+ Projects", desc: "Guided and open-ended projects covering storytelling, math, games, and robot control." },
    { icon: "🏆", title: "Certification", desc: "NITAI Picto Lab certificates at Beginner, Intermediate, and Advanced levels." },
  ],
  screenshots: [
    "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?w=800&q=80",
    "https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?w=400&q=80",
    "https://images.unsplash.com/photo-1568585219057-9206080e6c74?w=400&q=80",
    "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=400&q=80",
  ],
  plans: [
    {
      name: "Starter",
      price: "₹999/mo",
      features: ["Up to 30 students", "100 projects", "Basic reporting", "Email support", "1 teacher account"],
    },
    {
      name: "School",
      price: "₹2,499/mo",
      features: ["Up to 150 students", "200+ projects", "Advanced analytics", "Priority support", "5 teacher accounts", "Robot integration", "Parent reports"],
    },
    {
      name: "Campus",
      price: "Custom",
      features: ["Unlimited students", "All projects & modules", "Custom branding", "Dedicated success manager", "API access", "Multi-campus management", "SLA guarantee"],
    },
  ],
  ageGroup: "Ages 6–14",
  badge: "Visual Coding",
};

export default function PictoLabPage() {
  return (
    <>
      <ProductPageTemplate product={data} />
      {/* Floating playground CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/products/picto-lab/challenges">
          <Button size="lg" className="cursor-pointer gap-2 shadow-xl shadow-primary/25 font-semibold text-base px-6">
            <span className="text-lg">🎨</span>
            Try Picto Lab Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </>
  );
}
