import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import Navbar from "../../_components/Navbar.tsx";
import Footer from "../../_components/Footer.tsx";

export type ProductPageData = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  heroGradient: string;
  overview: string;
  features: { icon: string; title: string; desc: string }[];
  screenshots: string[];
  plans: { name: string; price: string; features: string[] }[];
  ageGroup: string;
  badge: string;
};

export default function ProductPageTemplate({ product }: { product: ProductPageData }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className={`relative pt-28 pb-20 bg-gradient-to-br ${product.heroGradient}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary border border-white/30">
              {product.icon}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              {product.badge} · {product.ageGroup}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
              {product.title}
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">{product.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/products/${product.id}/challenges`}>
                <Button size="lg" className="gap-2 font-semibold cursor-pointer">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="cursor-pointer">
                  Schedule Demo
                </Button>
              </Link>
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
                What is {product.title}?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.overview}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {product.screenshots.slice(0, 4).map((img, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 h-52" : "h-36"}`}>
                  <img src={img} alt={`${product.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Features & Capabilities</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything that makes {product.title} the best in class.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((f, i) => (
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

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Plans & Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Flexible plans for schools of every size. All plans include full support and training.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card border rounded-2xl p-8 flex flex-col ${i === 1 ? "border-primary shadow-lg shadow-primary/10 scale-105" : "border-border"}`}
              >
                {i === 1 && (
                  <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-4">Most Popular</div>
                )}
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/products/${product.id}/subscribe`} className="w-full">
                  <Button className={`w-full cursor-pointer ${i === 1 ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
