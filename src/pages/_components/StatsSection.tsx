import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "100,000+", label: "Lives Transformed", color: "text-primary" },
  { value: "20+", label: "Countries Reached", color: "text-accent" },
  { value: "100+", label: "Institutions Served", color: "text-primary" },
  { value: "17", label: "Specialized Labs", color: "text-accent" },
  { value: "5,000+", label: "Certified Educators", color: "text-primary" },
  { value: "2014", label: "Founded by Nitai Group", color: "text-accent" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-primary/5 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className={`text-3xl sm:text-4xl font-display font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
