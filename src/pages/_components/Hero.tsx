import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, Globe, BookOpen, Cpu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import Mascot from "./Mascot.tsx";
import { fireConfetti } from "@/lib/confetti.ts";

const floatingBadges = [
  { icon: "🤖", label: "AI Lab", color: "bg-blue-500/10 border-blue-500/20 text-blue-600", x: "left-[5%]", y: "top-[30%]" },
  { icon: "🔬", label: "STEM Lab", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600", x: "right-[6%]", y: "top-[35%]" },
  { icon: "🚀", label: "Space Lab", color: "bg-purple-500/10 border-purple-500/20 text-purple-600", x: "left-[3%]", y: "bottom-[30%]" },
  { icon: "⚡", label: "Agentic AI", color: "bg-orange-500/10 border-orange-500/20 text-orange-600", x: "right-[4%]", y: "bottom-[28%]" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating badges - desktop only */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className={`absolute hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-sm ${badge.color} ${badge.x} ${badge.y}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 1 + i * 0.15, duration: 0.5 },
            scale: { delay: 1 + i * 0.15, duration: 0.5 },
            y: { delay: 1 + i * 0.15, duration: 3, repeat: Infinity, ease: "easeInOut" as const },
          }}
        >
          <span className="text-lg">{badge.icon}</span>
          <span className="text-xs font-semibold">{badge.label}</span>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>An Initiative of Nitai Group — AI for Social Good & AI for Spiritual Good</span>
        </motion.div>

        {/* Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {[
            { icon: <Heart className="w-3.5 h-3.5" />, text: "AI for Social Good" },
            { icon: <Sparkles className="w-3.5 h-3.5" />, text: "AI for Spiritual Good" },
            { icon: <Cpu className="w-3.5 h-3.5" />, text: "17 Specialized Labs" },
          ].map((b) => (
            <span key={b.text} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium border border-border">
              <span className="text-primary">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-balance leading-tight tracking-tight mb-6"
        >
          <span className="text-foreground">All-in-One</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            NITAI AI Lab
          </span>
          <br />
          <span className="text-foreground text-3xl sm:text-4xl md:text-5xl">
            for Schools, Colleges & Universities
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Creating <strong className="text-foreground">future job-ready</strong> and <strong className="text-foreground">startup-ready leaders</strong> from academia — with <strong className="text-foreground">Earn While You Learn</strong> opportunities from local to global. 17 cutting-edge labs including AI, Robotics, Space, Agentic AI, Autonomous Systems, IR 5.0 & more.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <Button size="lg" className="text-base font-semibold px-8 gap-2 cursor-pointer" asChild>
            <Link to="/login" onClick={() => fireConfetti({ count: 80 })}>Get Started <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <a
            href="https://www.youtube.com/@nitaigroup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="text-base font-semibold px-8 gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </Button>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { icon: <Globe className="w-4 h-4" />, text: "20+ Countries" },
            { icon: <BookOpen className="w-4 h-4" />, text: "100+ Institutions" },
            { icon: <Sparkles className="w-4 h-4" />, text: "100,000+ Lives Impacted" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-primary">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mascot - bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-20 right-8 z-20 hidden md:block"
      >
        <Mascot
          size={64}
          onClick={() => {
            document.getElementById("labs")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <motion.p
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="text-xs text-muted-foreground mt-1 text-center font-medium"
        >
          Click me!
        </motion.p>
      </motion.div>

      {/* Hero fade bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"
      />
    </section>
  );
}
