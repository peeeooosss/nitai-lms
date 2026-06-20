import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  School,
  BookOpen,
  Building2,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Trophy,
  Shield,
  HeadphonesIcon,
  BarChart3,
} from "lucide-react";

const solutions = [
  {
    id: "schools",
    icon: <School className="w-8 h-8" />,
    title: "For Schools",
    subtitle: "K-12 AI & STEM Education",
    gradient: "from-blue-500 to-cyan-500",
    description:
      "Transform your school into a 21st-century learning hub. Our turnkey lab solutions are designed for students aged 6–18, with age-appropriate curriculum, certified hardware, and full teacher support.",
    features: [
      "Age-appropriate AI & Robotics curriculum (Grade 1–12)",
      "NITAI Picto Lab for visual coding (ages 6–10)",
      "Python Lab for intermediate coders (ages 11+)",
      "Complete lab setup in under 2 weeks",
      "Dedicated school relationship manager",
      "Annual teacher re-certification included",
      "Student progress dashboards",
      "Participation in national & global Olympiads",
    ],
    stats: [
      { label: "Schools Served", value: "500+" },
      { label: "Students Impacted", value: "2L+" },
      { label: "Avg Setup Time", value: "12 Days" },
    ],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: "colleges",
    icon: <BookOpen className="w-8 h-8" />,
    title: "For Colleges",
    subtitle: "Diploma & Undergraduate Innovation Labs",
    gradient: "from-purple-500 to-pink-500",
    description:
      "Equip your college with industry-aligned AI, IoT and Robotics labs that prepare diploma and degree students for top tech careers. Bridge the gap between theory and real-world practice.",
    features: [
      "Industry-aligned AI, IoT & Robotics labs",
      "Final-year project mentorship program",
      "Corporate internship placement support",
      "Hackathon & innovation challenge hosting",
      "Smart classroom integration",
      "Skill certification aligned to NEP 2020",
      "Faculty upskilling workshops",
      "Lab Management Software (NITAI LMS)",
    ],
    stats: [
      { label: "Colleges Served", value: "120+" },
      { label: "Industry Partners", value: "40+" },
      { label: "Placement Rate", value: "87%" },
    ],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: "universities",
    icon: <Building2 className="w-8 h-8" />,
    title: "For Universities",
    subtitle: "Research-Grade AI & Deep Tech Labs",
    gradient: "from-orange-500 to-red-500",
    description:
      "Build world-class research infrastructure with our university-grade AI, Quantum Computing awareness, AR/VR, and deep tech labs. Designed for research scholars, PhD candidates and innovation centers.",
    features: [
      "Research-grade AI & ML hardware clusters",
      "Quantum computing awareness lab",
      "AR/VR immersive simulation center",
      "IPR & patent support for innovations",
      "National & international collaboration facilitation",
      "Centre of Excellence (CoE) setup support",
      "Grant proposal writing assistance",
      "Industry-sponsored research programs",
    ],
    stats: [
      { label: "Universities Served", value: "35+" },
      { label: "Research Papers", value: "200+" },
      { label: "CoEs Established", value: "18" },
    ],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: "global",
    icon: <Globe className="w-8 h-8" />,
    title: "Global Partners",
    subtitle: "International Expansion & Franchise",
    gradient: "from-green-500 to-teal-500",
    description:
      "Join the NITAI global network as a country partner, master franchise or regional distributor. Bring world-class AI lab education to your country with our proven model, branding and full support.",
    features: [
      "Master franchise available in 50+ countries",
      "Localized curriculum in 12+ languages",
      "Hardware export & logistics support",
      "Partner training & certification",
      "Co-branded marketing materials",
      "Revenue share & royalty models",
      "Annual global partner summit",
      "Dedicated international account manager",
    ],
    stats: [
      { label: "Countries", value: "50+" },
      { label: "Active Partners", value: "80+" },
      { label: "Languages", value: "12+" },
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
];

const whyNitai = [
  { icon: <Zap className="w-5 h-5" />, title: "Turnkey Setup", desc: "Lab installed & running in under 2 weeks — hardware, software & curriculum all included." },
  { icon: <Users className="w-5 h-5" />, title: "Trained Teachers", desc: "Every lab comes with certified teacher training. Ongoing support is always available." },
  { icon: <Trophy className="w-5 h-5" />, title: "Award-Winning Curriculum", desc: "NEP 2020 aligned, globally benchmarked, and updated every semester." },
  { icon: <Shield className="w-5 h-5" />, title: "3-Year Warranty", desc: "All hardware covered. Zero-downtime SLA for critical components." },
  { icon: <HeadphonesIcon className="w-5 h-5" />, title: "24×7 Support", desc: "Dedicated support team reachable by phone, email and WhatsApp." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Analytics Dashboard", desc: "Track student progress, lab usage, and certification achievements in real time." },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 uppercase tracking-widest">
              Solutions
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Built for Every{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Institution
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance">
              From primary schools to research universities, NITAI AI Lab provides tailored, turnkey AI & STEM lab solutions that fit your institution's needs, budget, and vision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="font-semibold" asChild>
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="ghost" className="font-semibold border border-border" asChild>
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {solutions.map((sol, idx) => (
            <motion.div
              key={sol.id}
              id={sol.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image side */}
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${sol.gradient} opacity-20`} />
                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    {sol.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex-1 bg-background/90 backdrop-blur rounded-xl p-3 text-center"
                      >
                        <div className="text-lg font-bold text-primary">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div className={`inline-flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r ${sol.gradient} text-white mb-4`}>
                  {sol.icon}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {sol.title}
                </h2>
                <p className="text-primary font-semibold mb-4">{sol.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{sol.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {sol.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="font-semibold" asChild>
                  <Link to="/contact">
                    Get a Proposal <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why NITAI */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Institutions Choose NITAI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              More than just hardware — a complete ecosystem for 21st century education.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyNitai.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl p-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-muted-foreground mb-8">
              Schedule a free demo. Our education experts will design a custom lab proposal for your institution.
            </p>
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Schedule Free Demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
