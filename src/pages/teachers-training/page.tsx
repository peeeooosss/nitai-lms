import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  GraduationCap,
  Star,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  ArrowRight,
  CalendarDays,
  MapPin,
  Monitor,
  Lightbulb,
} from "lucide-react";

const programs = [
  {
    title: "Foundation Certification",
    level: "Beginner",
    duration: "3 Days",
    mode: "Online / Offline",
    badge: "bg-green-500/10 text-green-600 border-green-500/20",
    description:
      "Designed for teachers who are new to AI and STEM education. Learn the basics of robotics, coding with Scratch/Python, and how to integrate technology into your classroom.",
    topics: [
      "Introduction to AI & Machine Learning",
      "Hands-on Robotics for beginners",
      "Block-based coding with NITAI Picto Lab",
      "Lesson plan design for STEM",
      "Classroom management for tech labs",
      "Assessment strategies for STEM",
    ],
    outcomes: [
      "NITAI Certified Educator – Foundation",
      "Access to lesson plan library",
      "Membership in the NITAI Teacher Community",
    ],
  },
  {
    title: "Advanced Practitioner",
    level: "Intermediate",
    duration: "5 Days",
    mode: "Offline (Workshop)",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    description:
      "For educators who have completed Foundation or have prior STEM teaching experience. Deep dive into Python programming, IoT projects, and curriculum design.",
    topics: [
      "Python programming for educators",
      "IoT project design & implementation",
      "AR/VR tools in education",
      "Designing project-based learning (PBL)",
      "Student innovation mentorship",
      "NITAI LMS administration",
    ],
    outcomes: [
      "NITAI Certified Educator – Advanced",
      "Priority for Master Trainer roles",
      "Featured on NITAI Educator Spotlight",
    ],
  },
  {
    title: "Master Trainer Program",
    level: "Expert",
    duration: "10 Days",
    mode: "Residential Workshop",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    description:
      "The highest tier — designed for department heads, senior teachers and education leaders. Become a NITAI Master Trainer who can certify other teachers across your state or country.",
    topics: [
      "Full AI curriculum delivery mastery",
      "Trainer-of-trainers methodology",
      "Lab administration & management",
      "Evaluation & grading frameworks",
      "Content creation for online modules",
      "National Olympiad coaching techniques",
    ],
    outcomes: [
      "NITAI Master Trainer Certificate",
      "Authority to certify other teachers",
      "Revenue share for training programs",
      "Annual recognition award",
    ],
  },
];

const trainingFormats = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Live Online Workshops",
    desc: "Interactive Zoom-based sessions with hands-on virtual simulations. Certificate awarded on completion.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "On-Campus Training",
    desc: "NITAI trainers visit your school or college and conduct training directly in your lab environment.",
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Summer & Winter Intensives",
    desc: "Dedicated vacation-period boot camps open to teachers from all institutions.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Self-Paced eLearning",
    desc: "Access 100+ video lessons, quizzes, and assignments anytime via the NITAI LMS.",
  },
];

const upcomingBatches = [
  { date: "June 15, 2025", program: "Foundation Certification", mode: "Online", seats: 40, available: 18 },
  { date: "July 3, 2025", program: "Advanced Practitioner", mode: "Offline – Delhi", seats: 30, available: 9 },
  { date: "July 20, 2025", program: "Foundation Certification", mode: "Online", seats: 40, available: 32 },
  { date: "August 5, 2025", program: "Master Trainer Program", mode: "Residential – Pune", seats: 20, available: 5 },
];

export default function TeachersTrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 mb-6 uppercase tracking-widest">
                Teachers Training
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Empower Educators for the{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  AI Age
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                NITAI's teacher certification programs transform educators into confident AI & STEM instructors. Internationally recognized certifications, hands-on training, and a global community of 5,000+ certified teachers.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: <Users className="w-4 h-4" />, label: "5,000+ Certified Teachers" },
                  { icon: <Star className="w-4 h-4" />, label: "4.9 / 5 Avg Rating" },
                  { icon: <Award className="w-4 h-4" />, label: "Globally Recognized Cert" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-foreground/80 bg-card border border-border px-3 py-2 rounded-lg">
                    <span className="text-primary">{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="font-semibold" asChild>
                  <Link to="/contact">Register Now</Link>
                </Button>
                <Button size="lg" variant="ghost" className="font-semibold border border-border" asChild>
                  <Link to="/contact?subject=brochure">Download Brochure</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80"
                alt="Teachers Training Workshop"
                className="w-full h-80 md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                {[
                  { value: "3", label: "Certification Tiers" },
                  { value: "50+", label: "Countries" },
                  { value: "12", label: "Languages" },
                ].map((s) => (
                  <div key={s.label} className="bg-background/90 backdrop-blur rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-primary">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certification Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three progressive tiers — from classroom beginner to national master trainer.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${prog.badge}`}>
                    {prog.level}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{prog.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{prog.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{prog.mode}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {prog.description}
                </p>
                <div className="mb-5">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Topics Covered</p>
                  <ul className="space-y-1.5">
                    {prog.topics.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-foreground/75">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-4 mb-5">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">What You Get</p>
                  <ul className="space-y-1.5">
                    {prog.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-primary font-medium">
                        <Award className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full font-semibold" asChild>
                  <Link to="/contact">
                    Enrol Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Formats */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Training Formats</h2>
            <p className="text-muted-foreground">Flexible delivery modes to fit your schedule and institution.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingFormats.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Upcoming Batches</h2>
            <p className="text-muted-foreground">Seats are limited. Register early to secure your spot.</p>
          </div>
          <div className="space-y-4">
            {upcomingBatches.map((batch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{batch.program}</p>
                    <p className="text-sm text-muted-foreground">{batch.date} · {batch.mode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{batch.available}</p>
                    <p className="text-xs text-muted-foreground">Seats Left</p>
                  </div>
                  <Button size="sm" className="font-semibold" asChild>
                    <Link to="/contact">Register</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-12"
          >
            <GraduationCap className="w-14 h-14 text-amber-500 mx-auto mb-5" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready to Become a Certified AI Educator?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 5,000+ teachers across 50 countries who are transforming education with NITAI.
            </p>
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Get Certified Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
