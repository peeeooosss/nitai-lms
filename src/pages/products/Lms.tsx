import { BookOpen } from "lucide-react";
import ProductPageTemplate from "./_components/ProductPageTemplate.tsx";
import type { ProductPageData } from "./_components/ProductPageTemplate.tsx";

const data: ProductPageData = {
  id: "lms",
  icon: <BookOpen className="w-8 h-8" />,
  title: "NITAI LMS",
  subtitle: "All-in-One Learning Management System",
  description:
    "The central command center for all NITAI lab activities — courses, live classes, assessments, analytics, teacher tools, and parent portals in one unified platform.",
  heroGradient: "from-violet-500/10 via-purple-500/5 to-background",
  overview:
    "NITAI LMS is the backbone of the entire NITAI lab ecosystem. It connects teachers, students, parents, and administrators on a single platform. Schools use it to manage all NITAI lab curricula, run live virtual sessions, create and grade assessments, track student progress with detailed analytics, and communicate with parents. With built-in course authoring, it is easy for teachers to create and customize their own content alongside the pre-built NITAI library.",
  features: [
    { icon: "📚", title: "Course Management", desc: "Create, publish, and manage courses for all 8 NITAI labs in a unified content library." },
    { icon: "🎥", title: "Live Virtual Classes", desc: "Integrated video conferencing with breakout rooms, screen sharing, and whiteboard tools." },
    { icon: "📝", title: "Assessment Engine", desc: "Auto-graded quizzes, coding challenges, project submissions, and rubric-based evaluation." },
    { icon: "📊", title: "Learning Analytics", desc: "Detailed dashboards showing student performance, engagement, completion rates, and skill growth." },
    { icon: "👨‍👩‍👧", title: "Parent Portal", desc: "Parents get real-time updates on their child's progress, upcoming assignments, and achievements." },
    { icon: "🔗", title: "Lab Integration", desc: "Deep integration with NITAI Picto Lab and Python Lab for unified student records." },
    { icon: "🌐", title: "Multi-Language", desc: "Full platform available in 12+ languages to serve diverse student populations globally." },
    { icon: "🔒", title: "Enterprise Security", desc: "GDPR compliant, end-to-end encryption, and granular role-based access controls." },
  ],
  screenshots: [
    "https://images.unsplash.com/photo-1705579610984-910ad33fe2db?w=800&q=80",
    "https://images.unsplash.com/photo-1723987135977-ae935608939e?w=400&q=80",
    "https://images.unsplash.com/photo-1568585219057-9206080e6c74?w=400&q=80",
    "https://images.unsplash.com/photo-1618758992779-47151c11b39c?w=400&q=80",
  ],
  plans: [
    {
      name: "School",
      price: "₹4,999/mo",
      features: ["Up to 500 students", "All 8 lab curricula", "Live classes", "Basic analytics", "10 teacher accounts", "Parent portal", "Email support"],
    },
    {
      name: "Institution",
      price: "₹9,999/mo",
      features: ["Up to 2,000 students", "Advanced analytics", "Custom curriculum authoring", "SIS integration", "Unlimited teachers", "Priority support", "API access"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited students", "Multi-campus management", "White-labeling", "Custom domains", "Dedicated success team", "SLA guarantee", "Data export & BI tools"],
    },
  ],
  ageGroup: "All Levels",
  badge: "Platform",
};

export default function LmsPage() {
  return <ProductPageTemplate product={data} />;
}
