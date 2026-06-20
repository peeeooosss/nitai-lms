import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const navLinks = [
  {
    label: "Labs",
    children: [
      { label: "AI Lab", href: "/labs/ai" },
      { label: "Robotics Lab", href: "/labs/robotics" },
      { label: "IoT Lab", href: "/labs/iot" },
      { label: "AR/VR Lab", href: "/labs/arvr" },
      { label: "Coding Lab", href: "/labs/coding" },
      { label: "STEM Lab", href: "/labs/stem" },
      { label: "Creator Lab", href: "/labs/creator" },
      { label: "Skill Lab", href: "/labs/skill" },
      { label: "Space & Satellite Lab", href: "/labs/space" },
      { label: "R&D & Innovation Lab", href: "/labs/rnd" },
      { label: "Incubation & Startup Lab", href: "/labs/incubation" },
      { label: "AI Tools Lab", href: "/labs/ai-tools" },
      { label: "Agentic AI Lab", href: "/labs/agentic-ai" },
      { label: "Automated Systems Lab", href: "/labs/automated" },
      { label: "Autonomous Systems Lab", href: "/labs/autonomous" },
      { label: "Future Industry Lab IR 5.0", href: "/labs/ir50" },
      { label: "Future Workforce Lab", href: "/labs/future-workforce" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "NITAI Picto Lab", href: "/products/picto-lab" },
      { label: "NITAI Python Lab", href: "/products/python-lab" },
      { label: "NITAI LMS", href: "/products/lms" },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Teachers Training", href: "/teachers-training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://hercules-cdn.com/file_5KIHyIstiq38Ebhk7ok2K76s"
              alt="NITAI AI Lab"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg text-primary leading-tight">
                NITAI
              </div>
              <div className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                AI Lab
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 cursor-pointer">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-xl p-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href ?? "/"}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 cursor-pointer"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button size="sm" className="font-semibold" asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg cursor-pointer"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href ?? "/"}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg cursor-pointer"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3">
                <Button className="w-full font-semibold" asChild>
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
