import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-primary to-accent/80 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white text-balance mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
              Join institutions across 20+ countries. Set up your NITAI AI Lab today — create future job-ready leaders, startup-ready innovators, and earn-while-you-learn opportunities for all.
            </p>
            <p className="text-sm text-white/60 mb-10 italic">
              An initiative of Nitai Group — AI for Social Good. AI for Spiritual Good.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-base px-10 gap-2 cursor-pointer"
                asChild
              >
                <Link to="/contact">Get a Free Demo <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold text-base px-10 cursor-pointer"
                asChild
              >
                <Link to="/contact">Download Brochure</Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 text-white/70 text-sm">
              <a href="mailto:nitaigroup.12@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                nitaigroup.12@gmail.com
              </a>
              <a href="tel:+919340952324" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                +91 93409 52324
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
