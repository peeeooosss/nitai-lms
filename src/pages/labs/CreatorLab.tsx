import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "creator-lab",
  emoji: "🎨",
  title: "Creator Lab",
  tagline: "Create. Design. Inspire.",
  description:
    "A digital creativity studio where students design, print, produce, and publish. The Creator Lab develops makers, designers, and digital storytellers ready for the creative economy.",
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  gradient: "from-pink-500/20 to-rose-500/10",
  accentColor: "bg-pink-500/10 text-pink-600 border border-pink-500/20",
  overview:
    "The NITAI Creator Lab is where technology meets creativity. Equipped with 3D printers, laser cutters, digital drawing tablets, video production stations, and professional design software, students learn to bring their ideas to life in physical and digital form. Whether designing a product prototype, producing a YouTube-quality video, or creating digital art, the Creator Lab nurtures the next generation of innovators and entrepreneurs.",
  keyFeatures: [
    { icon: "🖨️", title: "3D Printing Studio", desc: "Industry-grade 3D printers with design software for creating physical prototypes and models." },
    { icon: "✏️", title: "Digital Design Suite", desc: "Graphic design, UI/UX tools, and digital illustration on professional drawing tablets." },
    { icon: "🎬", title: "Video Production Station", desc: "Camera, lighting, and editing software for creating professional-quality videos and podcasts." },
    { icon: "⚡", title: "Laser Cutter", desc: "Precision laser cutting for creating custom physical designs from wood, acrylic, and cardboard." },
    { icon: "🎵", title: "Music & Audio Studio", desc: "Digital audio workstation for music production, sound design, and podcasting." },
    { icon: "🚀", title: "Maker Culture", desc: "Project-based learning that builds an entrepreneurial mindset and passion for making." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 4–7)",
      topics: ["Digital drawing basics", "Intro to 3D shapes", "Stop-motion animation", "Photo editing fundamentals", "First print project"],
    },
    {
      level: "Intermediate (Grade 8–10)",
      topics: ["3D CAD design", "Graphic design principles", "Short film production", "Laser cutting projects", "Personal branding basics"],
    },
    {
      level: "Advanced (Grade 11+ / College)",
      topics: ["Product design process", "Advanced video editing", "UI/UX design principles", "Portfolio development", "Creative entrepreneurship project"],
    },
  ],
  outcomes: [
    "Design and 3D print functional prototypes",
    "Create professional-quality digital graphics and videos",
    "Use design thinking to solve creative problems",
    "Build a digital portfolio of creative projects",
    "Understand intellectual property and creative industries",
    "Develop an entrepreneurial mindset through making",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    "https://images.unsplash.com/photo-1659070953831-dd4fa16222fb?w=400&q=80",
    "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400&q=80",
    "https://images.unsplash.com/photo-1502185635613-0a5b2e78efea?w=400&q=80",
  ],
  ageGroup: "Ages 9–22",
  duration: "Academic Year",
  kitIncludes: ["3D Printers (2 units)", "Drawing Tablets (Class Set)", "Laser Cutter", "Video Camera & Lighting", "Design Software Suite", "Filament & Materials Pack", "Audio Equipment", "Creative Project Guides"],
};

export default function CreatorLabPage() {
  return <LabPageTemplate lab={data} />;
}
