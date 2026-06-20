import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "incubation-lab",
  emoji: "🌱",
  title: "Incubation & Startup Lab",
  tagline: "Build Your Startup",
  description: "From idea to funded startup — students get business model training, pitch coaching, investor access, and the full ecosystem to build real ventures from campus.",
  heroImage: "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=1400&q=80",
  gradient: "from-green-500/20 to-emerald-500/10",
  accentColor: "bg-green-500/10 text-green-600 border border-green-500/20",
  ageGroup: "Grade 11–PG",
  duration: "200 hrs/year",
  overview:
    "From a napkin idea to a funded, market-ready startup — this lab provides the complete entrepreneurial ecosystem within your campus. Students receive business model training, pitch coaching, mentorship from active investors and founders, access to seed funding, legal and IP guidance, and a thriving network of alumni entrepreneurs. The only incubator built specifically for student-age founders.",
  keyFeatures: [
    {
      title: "Business Model Canvas",
      desc:
        "Master lean startup methodology, value proposition design, and customer discovery through live market validation exercises.",
      icon: "LayoutGrid",
    },
    {
      title: "Pitch Deck Training",
      desc:
        "Structured pitch workshops with real-time investor feedback, storytelling frameworks, and demo day preparation.",
      icon: "Presentation",
    },
    {
      title: "Investor Connect",
      desc:
        "Direct access to a curated network of angel investors, VCs, and government grant programs like Startup India and TIDE 2.0.",
      icon: "TrendingUp",
    },
    {
      title: "Legal & IP Guidance",
      desc:
        "Startup incorporation, co-founder agreements, IP protection, and regulatory compliance support from expert legal advisors.",
      icon: "Scale",
    },
    {
      title: "Prototype Funding",
      desc:
        "Internal micro-grants and access to external pre-seed funding for teams that successfully validate their business model.",
      icon: "DollarSign",
    },
    {
      title: "Alumni Startup Network",
      desc:
        "Connect with a thriving community of alumni founders for mentorship, partnerships, early customers, and co-founder matching.",
      icon: "Network",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Entrepreneurial mindset and opportunity recognition",
        "Customer discovery and problem interviews",
        "Business Model Canvas and Lean Canvas",
        "Market sizing: TAM, SAM, and SOM",
        "Introduction to startup ecosystems in India",
        "Case studies of successful student startups",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "MVP design and rapid prototyping",
        "Go-to-market strategy and early traction",
        "Financial modeling and unit economics",
        "Pitch deck building and storytelling",
        "Legal structures: LLP, Pvt Ltd, and OPC",
        "Applying for Startup India and DPIIT recognition",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Fundraising strategy: angels, VCs, and grants",
        "Term sheet negotiation and cap table management",
        "Scaling operations and hiring first team members",
        "Product-market fit metrics and growth loops",
        "Demo Day preparation and live investor pitching",
        "Capstone: launch a real product with paying customers",
      ],
    },
  ],
  outcomes: [
    "Launch a real, revenue-generating startup before graduation",
    "DPIIT-recognized startup certificate and Startup India benefits",
    "Pitch-ready skills for national competitions like NASSCOM and TiE",
    "Network of 500+ investors, mentors, and fellow founders",
    "Financial literacy including cap tables, valuations, and term sheets",
    "Pathway to top accelerators like YC, Antler, and Surge",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "Startup Founder's Toolkit: canvas templates, pitch deck base, legal docs",
    "Business Model & Lean Startup Workshop Materials",
    "1-year access to Startup India resource portal and grants database",
    "Mentor Session Credits (12 one-on-one sessions with industry mentors)",
    "Demo Day Preparation Pack: slide templates, presentation coaching guide",
  ],
};

export default function IncubationLabPage() {
  return <LabPageTemplate lab={data} />;
}
