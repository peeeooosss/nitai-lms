import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Monitor, Code2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const products = [
  {
    id: "picto-lab",
    href: "/products/picto-lab",
    icon: <Monitor className="w-8 h-8" />,
    title: "NITAI Picto Lab",
    subtitle: "Visual Block Programming",
    description:
      "A visual, drag-and-drop programming environment designed for young learners. Students create programs using picture-based blocks — no syntax required. Perfect for K-8 students starting their coding journey.",
    features: [
      "Drag & Drop Interface",
      "200+ Pre-built Blocks",
      "Real Robot Integration",
      "Progress Tracking",
      "Gamified Learning",
      "Offline Capable",
    ],
    color: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    badge: "Ages 6-14",
  },
  {
    id: "python-lab",
    href: "/products/python-lab",
    icon: <Code2 className="w-8 h-8" />,
    title: "NITAI Python Lab",
    subtitle: "Professional Code Environment",
    description:
      "A browser-based Python IDE tailored for students. Features intelligent code suggestions, instant execution, built-in projects, and integration with physical hardware for IoT and robotics experiments.",
    features: [
      "Browser-Based IDE",
      "AI Code Suggestions",
      "100+ Projects Library",
      "Hardware Integration",
      "Real-Time Collaboration",
      "Certificate System",
    ],
    color: "from-yellow-500 to-orange-500",
    textColor: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    badge: "Ages 12+",
  },
  {
    id: "lms",
    href: "/products/lms",
    icon: <BookOpen className="w-8 h-8" />,
    title: "NITAI LMS",
    subtitle: "Learning Management System",
    description:
      "A comprehensive school-grade Learning Management System with course authoring, assessments, live classes, analytics, and parent portals. The command centre for all NITAI lab activities.",
    features: [
      "Course Builder",
      "Live Virtual Classes",
      "Assessment Engine",
      "Parent Portal",
      "Multi-Language",
      "Advanced Analytics",
    ],
    color: "from-violet-500 to-purple-600",
    textColor: "text-violet-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    badge: "All Levels",
  },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/25 text-accent-foreground text-sm font-medium mb-4">
            Flagship Products
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Powerful EdTech Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built software and platforms that power every NITAI lab — from block coding to full LMS.
          </p>
        </motion.div>

        {/* Products */}
        <div className="space-y-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      id={product.id}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/20 hover:shadow-xl transition-all duration-300"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        {/* Visual panel */}
        <div
          className={`lg:w-2/5 p-10 flex flex-col items-center justify-center bg-gradient-to-br ${product.color} text-white min-h-48`}
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
            {product.icon}
          </div>
          <h3 className="text-2xl font-display font-bold text-center mb-1">{product.title}</h3>
          <p className="text-sm text-white/80 text-center mb-4">{product.subtitle}</p>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
            {product.badge}
          </span>
        </div>

        {/* Content panel */}
        <div className="lg:w-3/5 p-8 lg:p-10">
          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {product.features.map((f) => (
              <div
                key={f}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${product.bgColor} border ${product.borderColor}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-current ${product.textColor}`} />
                <span className={`text-xs font-semibold ${product.textColor}`}>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={product.href}>
              <Button className="gap-2 cursor-pointer">
                Explore {product.title.replace("NITAI ", "")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={`/contact?subject=demo&product=${product.id}`}>
              <Button variant="secondary" className="cursor-pointer">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
