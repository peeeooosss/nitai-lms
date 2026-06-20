import { Mail, Phone, MapPin, Share2, Users, Play, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Labs: [
    { label: "AI Lab", href: "/labs/ai" },
    { label: "Robotics Lab", href: "/labs/robotics" },
    { label: "IoT Lab", href: "/labs/iot" },
    { label: "AR/VR Lab", href: "/labs/arvr" },
    { label: "Coding Lab", href: "/labs/coding" },
    { label: "STEM Lab", href: "/labs/stem" },
    { label: "Creator Lab", href: "/labs/creator" },
    { label: "Skill Lab", href: "/labs/skill" },
    { label: "Space & Satellite Lab", href: "/labs/space" },
    { label: "Agentic AI Lab", href: "/labs/agentic-ai" },
    { label: "AI Tools Lab", href: "/labs/ai-tools" },
    { label: "Autonomous Systems Lab", href: "/labs/autonomous" },
    { label: "Future Industry Lab IR 5.0", href: "/labs/ir50" },
    { label: "Incubation & Startup Lab", href: "/labs/incubation" },
    { label: "R&D & Innovation Lab", href: "/labs/rnd" },
    { label: "Automated Systems Lab", href: "/labs/automated" },
    { label: "Future Workforce Lab", href: "/labs/future-workforce" },
  ],
  Products: [
    { label: "NITAI Picto Lab", href: "/products/picto-lab" },
    { label: "NITAI Python Lab", href: "/products/python-lab" },
    { label: "NITAI LMS", href: "/products/lms" },
  ],
  Solutions: [
    { label: "For Schools", href: "/solutions#schools" },
    { label: "For Colleges", href: "/solutions#colleges" },
    { label: "For Universities", href: "/solutions#universities" },
    { label: "Global Partners", href: "/solutions#global" },
    { label: "Teachers Training", href: "/teachers-training" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "News & Events", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Nitai Group", href: "https://www.nitaigroup.com" },
  ],
};

const socials = [
  { icon: <Share2 className="w-4 h-4" />, href: "https://twitter.com/nitaigroup", label: "Twitter/X" },
  { icon: <Users className="w-4 h-4" />, href: "https://www.linkedin.com/company/nitaigroup", label: "LinkedIn" },
  { icon: <Play className="w-4 h-4" />, href: "https://www.youtube.com/@nitaigroup", label: "YouTube" },
  { icon: <MessageCircle className="w-4 h-4" />, href: "https://www.facebook.com/nitaigroup", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
              <img
                src="https://hercules-cdn.com/file_5KIHyIstiq38Ebhk7ok2K76s"
                alt="NITAI AI Lab"
                className="h-10 w-auto"
              />
              <div>
                <div className="font-display font-bold text-primary leading-tight">NITAI AI Lab</div>
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase">An initiative of Nitai Group</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              AI for Social Good. AI for Spiritual Good. Creating future job-ready & startup-ready leaders from academia — with Earn While You Learn opportunities from local to global.
            </p>
            <p className="text-xs text-muted-foreground mb-6 italic">
              "Empowering Lives, Transforming Communities" — Nitai Group
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>nitaigroup.12@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 93409 52324</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Umari, Damoh, MP 470661, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-foreground text-sm mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            {`© ${new Date().getFullYear()} NITAI AI Lab — An Initiative of Nitai Group. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link to="/contact?subject=privacy" className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</Link>
            <Link to="/contact?subject=terms" className="hover:text-primary transition-colors cursor-pointer">Terms of Service</Link>
            <Link to="/contact?subject=cookies" className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
