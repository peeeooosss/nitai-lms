import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "future-workforce-lab",
  emoji: "💼",
  title: "Future Workforce Lab",
  tagline: "Earn While You Learn",
  description: "The ultimate earn-while-you-learn lab — connecting students with freelancing, global remote jobs, internships, and local entrepreneurship opportunities from Day 1.",
  heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80",
  gradient: "from-yellow-500/20 to-lime-500/10",
  accentColor: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
  ageGroup: "Grade 9–PG",
  duration: "200 hrs/year",
  overview:
    "The ultimate earn-while-you-learn lab that transforms students into working professionals from Day 1. Through structured access to freelancing platforms, a curated internship pipeline, global remote job opportunities, and local entrepreneurship projects, students build real income and a verified work portfolio before they even graduate — redefining what it means to be career-ready in the 21st century.",
  keyFeatures: [
    {
      title: "Freelancing Platform Access",
      desc:
        "Guided onboarding to Upwork, Fiverr, Toptal, and Contra with profile optimization, proposal writing, and first-client strategies.",
      icon: "Globe",
    },
    {
      title: "Global Job Connect",
      desc:
        "Curated remote job board with 500+ verified opportunities in tech, design, writing, marketing, and data from global employers.",
      icon: "Briefcase",
    },
    {
      title: "Internship Pipeline",
      desc:
        "Pre-negotiated paid internships with 200+ partner companies spanning startups, MNCs, and government organizations.",
      icon: "Building",
    },
    {
      title: "Entrepreneurship Projects",
      desc:
        "Real micro-business projects where students sell products or services locally and online, keeping 100% of their earnings.",
      icon: "TrendingUp",
    },
    {
      title: "Digital Portfolio Building",
      desc:
        "Build and publish a professional online portfolio with verified work samples, client testimonials, and measurable results.",
      icon: "Layout",
    },
    {
      title: "Earn While You Learn Marketplace",
      desc:
        "An exclusive internal marketplace connecting students with paying micro-tasks, tutoring gigs, and college project contracts.",
      icon: "ShoppingBag",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Future of work: remote, freelance, and gig economy overview",
        "Personal branding: LinkedIn, GitHub, and online presence",
        "Identifying your first marketable skill",
        "Freelancing platforms: account setup and profile optimization",
        "Resume and cover letter writing for the digital age",
        "Communication skills for professional client interactions",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Writing winning proposals and client acquisition strategies",
        "Pricing your work: hourly, project, and retainer models",
        "Remote work tools: Slack, Notion, Asana, and time tracking",
        "Building your first digital portfolio with case studies",
        "Internship readiness: interviews, onboarding, and performance",
        "Micro-entrepreneurship: selling services and digital products",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Scaling freelance income: retainers, agencies, and sub-contracting",
        "Global tax, invoicing, and payment tools for remote workers",
        "Building a personal brand as a thought leader in your field",
        "Career capital: stacking skills, projects, and credibility",
        "Transitioning from gigs to full-time remote roles",
        "Capstone: earn ₹10,000+ and land a formal internship offer",
      ],
    },
  ],
  outcomes: [
    "Real income earned and documented before graduation — typically ₹5,000–₹50,000+",
    "Active freelancing profiles on Upwork and Fiverr with verified 5-star reviews",
    "Paid internship or remote job secured through the lab's partner network",
    "Professional digital portfolio with 5+ verified work samples and client testimonials",
    "Life-long freelancing and career skills that no traditional degree provides",
    "Competitive advantage in placements, higher education applications, and entrepreneurship",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Career Launchpad Kit: resume templates, LinkedIn guide, and portfolio builder",
    "Freelancing Masterclass Course Pack (Upwork, Fiverr, Toptal walkthroughs)",
    "Remote Work Productivity Bundle: tools, templates, and daily systems",
    "Internship Readiness Workbook with mock interview scripts and feedback forms",
    "Earn While You Learn Marketplace Credits for accessing paid micro-tasks",
  ],
};

export default function FutureWorkforceLabPage() {
  return <LabPageTemplate lab={data} />;
}
