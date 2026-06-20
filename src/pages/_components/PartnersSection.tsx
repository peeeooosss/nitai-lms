import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { School, GraduationCap, Building2, Globe } from "lucide-react";

const solutions = [
  {
    icon: <School className="w-6 h-6" />,
    title: "Schools (K-12)",
    description: "Age-appropriate, curriculum-aligned labs for primary and secondary education. Supports CBSE, ICSE, IB, IGCSE, and national curricula.",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Colleges",
    description: "Advanced skill labs for diploma and undergraduate students with industry-aligned training and certifications.",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Universities",
    description: "Research-grade AI and robotics infrastructure for higher education. Full integration with academic programs.",
    color: "text-violet-500 bg-violet-500/10",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Partners",
    description: "International franchise and partner program. Deploy NITAI labs in your region with full support, training, and branding.",
    color: "text-orange-500 bg-orange-500/10",
  },
];

const partners = [
  "Microsoft", "Google", "NVIDIA", "Intel", "Arduino", "Raspberry Pi Foundation",
  "UNESCO", "UNICEF", "AWS", "IBM", "Meta", "Oracle",
];

export default function PartnersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { once: true, margin: "-80px" });

  return (
    <>
      {/* Solutions */}
      <section id="solutions" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/25 text-sm font-medium mb-4">
              Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Built for Every Institution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From primary school to university, NITAI scales perfectly for every level of education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-4`}>
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="about" className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Technology Partners & Associations
            </p>
            <h3 className="text-2xl font-display font-bold text-foreground">
              Backed by World Leaders
            </h3>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {partners.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
