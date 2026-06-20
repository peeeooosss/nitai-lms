import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Heart,
  Globe,
  Lightbulb,
  Users,
  Star,
  Target,
  Leaf,
  Shield,
  TrendingUp,
  Award,
  BookOpen,
  Rocket,
  Cpu,
  HandCoins,
  GraduationCap,
} from "lucide-react";

const timeline = [
  {
    year: "2014",
    title: "The Beginning",
    desc: "Nitai Group was founded by Amol Patel with a vision to serve humanity through education, agriculture, and social service. The first NGO, Shri Gaur Chaitanya Samajotthan Samiti, was established.",
  },
  {
    year: "2016–2018",
    title: "Expansion",
    desc: "The organization expanded its reach to multiple states in India, establishing schools, skill centers, and agricultural initiatives. The Nitai Organic Farming Movement was launched.",
  },
  {
    year: "2019–2020",
    title: "Digital Transformation",
    desc: "Nitai Group embraced technology, launching digital education platforms, AI initiatives, and online outreach programs to reach more people during the global pandemic.",
  },
  {
    year: "2021–2023",
    title: "Global Impact",
    desc: "Nitai Group operates across 12 sectors with a presence in 20+ countries, impacting over 100,000 lives through its various initiatives, partnerships, and programs.",
  },
  {
    year: "2024–Present",
    title: "NITAI AI Lab Initiative",
    desc: "Launched as a flagship initiative of Nitai Group, NITAI AI Lab now brings world-class AI, Robotics, STEM and Emerging Tech labs to schools, colleges and universities across the globe — with a mission of AI for Social Good and AI for Spiritual Good.",
  },
];

const values = [
  { icon: <Heart className="w-5 h-5" />, title: "Service", desc: "Selfless service to humanity across all walks of life, guided by compassion and care." },
  { icon: <Users className="w-5 h-5" />, title: "Unity", desc: "Bringing people together across borders, backgrounds, and beliefs to co-create a better world." },
  { icon: <Shield className="w-5 h-5" />, title: "Integrity", desc: "Transparent, ethical and accountable in all our actions and relationships." },
  { icon: <Lightbulb className="w-5 h-5" />, title: "Innovation", desc: "Constantly evolving, experimenting and innovating to find better solutions to complex challenges." },
  { icon: <Heart className="w-5 h-5" />, title: "Compassion", desc: "Leading with empathy and deep concern for the well-being of every individual and community." },
  { icon: <Leaf className="w-5 h-5" />, title: "Sustainability", desc: "Building solutions that are environmentally sound, economically viable, and socially equitable." },
];

const sectors = [
  "Education, Sports & Culture",
  "Agriculture & Cow Protection",
  "Health & Ayurveda",
  "Social Services & Spirituality",
  "Environment Protection",
  "Women & Child Empowerment",
  "Social Technology",
  "Rural & Urban Development",
  "AI & Emerging Technologies",
  "Skill Development",
  "Research & Innovation",
  "Global Partnerships",
];

const leadership = [
  {
    name: "Amol Patel",
    role: "Founder & Managing Director",
    desc: "Visionary social entrepreneur with a mission to uplift humanity through education, technology, and spiritual values. Founded Nitai Group in 2014 with a dream of Vishva Guru Bharat.",
    initials: "AP",
    color: "from-primary to-cyan-500",
  },
  {
    name: "Kalpana Patel",
    role: "Director, Women Empowerment",
    desc: "Champion of women's rights and empowerment across rural and urban India. Leading Nitai's programs for education, skill training, and entrepreneurship for women.",
    initials: "KP",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Dr. Gopal Patel",
    role: "Director, Research & Innovation",
    desc: "Academic and research leader guiding NITAI's AI and technology initiatives. Bridging the gap between cutting-edge research and accessible education for all.",
    initials: "GP",
    color: "from-orange-500 to-amber-500",
  },
];

const nitaiAiMission = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI for Social Good",
    desc: "Harnessing the power of Artificial Intelligence to solve pressing social challenges — from healthcare to agriculture, education to environment.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "AI for Spiritual Good",
    desc: "Exploring how AI can support spiritual growth, mindfulness, and the cultivation of human values — technology in service of consciousness.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Future Job-Ready Leaders",
    desc: "Equipping students from schools, colleges, and universities with the skills, certifications, and experience needed to thrive in the AI-powered economy.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Future Startup-Ready Leaders",
    desc: "Creating the next generation of tech entrepreneurs — from ideation to incubation — with mentorship, funding access, and global networks.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <HandCoins className="w-6 h-6" />,
    title: "Earn While You Learn",
    desc: "Unique opportunities at local and global levels where students earn through projects, internships, freelancing, and community innovation from Day 1.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Social-Spiritual Leaders",
    desc: "Shaping a new breed of leaders who combine technological mastery with social responsibility and spiritual wisdom — to serve humanity in the AI era.",
    color: "from-pink-500 to-rose-500",
  },
];

const impactStats = [
  { value: "100,000+", label: "Lives Transformed", icon: <Users className="w-5 h-5" /> },
  { value: "20+", label: "Countries Reached", icon: <Globe className="w-5 h-5" /> },
  { value: "100+", label: "Schools Established", icon: <BookOpen className="w-5 h-5" /> },
  { value: "2,000+", label: "Farmers Empowered", icon: <Leaf className="w-5 h-5" /> },
  { value: "2014", label: "Founded", icon: <Award className="w-5 h-5" /> },
  { value: "12", label: "Key Sectors", icon: <Target className="w-5 h-5" /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: "40px 40px" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 uppercase tracking-widest">
                About NITAI AI Lab
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                An Initiative of{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Nitai Group
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                NITAI AI Lab is the flagship education technology initiative of <strong className="text-foreground">Nitai Group</strong> — a global social conglomerate dedicated to empowering lives and transforming communities through innovation, compassion, and action.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our vision is simple yet profound: <strong className="text-foreground">AI for Social Good. AI for Spiritual Good.</strong> We create future-ready leaders from academia — schools, colleges and universities — with <strong className="text-foreground">Earn While You Learn</strong> opportunities from local to global level.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="font-semibold" asChild>
                  <Link to="/contact">Partner With Us</Link>
                </Button>
                <Button size="lg" variant="ghost" className="font-semibold border border-border" asChild>
                  <a href="https://www.nitaigroup.com" target="_blank" rel="noopener noreferrer">Visit Nitai Group</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {impactStats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="bg-card border border-border rounded-2xl p-4 text-center"
                    >
                      <div className="text-primary flex justify-center mb-2">{s.icon}</div>
                      <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-3xl p-8"
            >
              <Target className="w-10 h-10 text-primary mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed italic text-lg">
                "To create a world where every individual is physically, socially, mentally, economically, and spiritually empowered, positioning India as a global leader — <strong className="text-foreground not-italic">Vishva Guru Bharat.</strong>"
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8"
            >
              <TrendingUp className="w-10 h-10 text-purple-500 mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed italic text-lg">
                "To serve humanity universally by implementing innovative solutions, fostering collaboration, and creating sustainable opportunities for growth and development."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NITAI AI Lab Mission Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
                Our Purpose
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why NITAI AI Lab Exists
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We don't just build labs — we build leaders. Every initiative is rooted in six foundational purposes.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nitaiAiMission.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground">From humble beginnings to a global movement of transformation.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-2 mt-1.5 z-10" />
                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-[calc(50%+2rem)]"}`}>
                    <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.year}</span>
                      <h3 className="font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do — from the smallest interaction to our largest initiatives.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Sectors */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">12 Sectors of Impact</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Nitai Group works across 12 key sectors to create comprehensive, sustainable impact.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 text-center hover:border-primary/30 hover:text-primary transition-colors"
              >
                {sector}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Meet the visionaries guiding Nitai Group's mission and NITAI AI Lab's global expansion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-7 text-center hover:border-primary/30 transition-colors"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${person.color} flex items-center justify-center mx-auto mb-5`}>
                  <span className="text-2xl font-bold text-white">{person.initials}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{person.name}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{person.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Approach</h2>
            <p className="text-muted-foreground">Holistic, sustainable, and collaborative — the Nitai way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Holistic Development", desc: "We address the physical, mental, social, economic, and spiritual dimensions of well-being, recognizing that true transformation requires a comprehensive approach." },
              { icon: <Leaf className="w-6 h-6" />, title: "Sustainable Solutions", desc: "Our initiatives are designed to be environmentally sustainable, economically viable, and socially equitable, ensuring long-term impact and resilience." },
              { icon: <Users className="w-6 h-6" />, title: "Collaborative Partnerships", desc: "We work with governments, NGOs, businesses, academic institutions, and communities to leverage collective expertise, resources, and networks for greater impact." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
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
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl p-12"
          >
            <Globe className="w-14 h-14 text-primary mx-auto mb-5" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Join the Global Movement
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you are a school, college, university, NGO, government body, or individual changemaker — there is a place for you in the Nitai ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="font-semibold" asChild>
                <Link to="/contact">Get Involved</Link>
              </Button>
              <Button size="lg" variant="ghost" className="font-semibold border border-border" asChild>
                <a href="https://www.nitaigroup.com" target="_blank" rel="noopener noreferrer">Explore Nitai Group</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
