import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import Navbar from "../../_components/Navbar.tsx";
import Footer from "../../_components/Footer.tsx";

export type LabPageData = {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  gradient: string;
  accentColor: string;
  overview: string;
  keyFeatures: { icon: string; title: string; desc: string }[];
  curriculum: { level: string; topics: string[] }[];
  outcomes: string[];
  gallery: string[];
  ageGroup: string;
  duration: string;
  kitIncludes?: string[];
};

export default function LabPageTemplate({ lab }: { lab: LabPageData }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${lab.gradient} opacity-30`} />
        <div className="absolute inset-0">
          <img
            src={lab.heroImage}
            alt={lab.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#labs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Labs
            </Link>
            <div className="text-6xl mb-4">{lab.emoji}</div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${lab.accentColor}`}>
              {lab.ageGroup} · {lab.duration}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
              {lab.title}
            </h1>
            <p className={`text-xl font-semibold mb-4 ${lab.accentColor.split(" ")[0]}`}>
              {lab.tagline}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              {lab.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 font-semibold cursor-pointer" asChild>
                <Link to={`/contact?subject=lab-setup&lab=${lab.id}`}>
                  Request Lab Setup <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="cursor-pointer" asChild>
                <Link to={`/contact?subject=brochure&lab=${lab.id}`}>Download Brochure</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                About {lab.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">{lab.overview}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Age Group", value: lab.ageGroup },
                  { label: "Duration", value: lab.duration },
                  { label: "Format", value: "Hands-on + Theory" },
                  { label: "Certification", value: "NITAI Certified" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {lab.gallery.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 h-56" : "h-40"}`}
                >
                  <img
                    src={img}
                    alt={`${lab.title} gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to run a world-class {lab.title}.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lab.keyFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Curriculum Structure
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A progressive learning pathway designed for all skill levels.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lab.curriculum.map((level, i) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 ${lab.accentColor}`}>
                  {level.level}
                </div>
                <ul className="space-y-2.5">
                  {level.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Kit */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                Learning Outcomes
              </h2>
              <ul className="space-y-3">
                {lab.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {lab.kitIncludes && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                  Lab Kit Includes
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {lab.kitIncludes.map((item) => (
                    <div
                      key={item}
                      className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 bg-gradient-to-br ${lab.gradient}`}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Set Up {lab.title} at Your Institution
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a customized proposal, curriculum pack, and hardware quote for your school or university.
            </p>
            <Button size="lg" className="gap-2 font-semibold cursor-pointer" asChild>
              <Link to={`/contact?subject=proposal&lab=${lab.id}`}>
                Get a Free Proposal <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
