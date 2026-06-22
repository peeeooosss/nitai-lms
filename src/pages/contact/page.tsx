import { useState } from "react";
import { motion } from "motion/react";
import { api } from "@/lib/api.ts";
import { toast } from "sonner";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  MessageSquare,
  Headphones,
  Globe,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  organizationType: string;
  subject: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  organizationType: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    lines: ["nitaigroup.12@gmail.com"],
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Call / WhatsApp",
    lines: ["+91 93409 52324"],
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Headquarters",
    lines: ["29, Umari, Village Umari", "Damoh, MP 470661, India"],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Working Hours",
    lines: ["Mon–Sat: 9:00 AM – 6:00 PM IST", "Support: 24×7 WhatsApp"],
  },
];

const supportOptions = [
  { icon: <MessageSquare className="w-5 h-5" />, title: "WhatsApp Support", desc: "Chat with our team instantly via WhatsApp for quick responses." },
  { icon: <Headphones className="w-5 h-5" />, title: "Demo Request", desc: "Book a live product demo with one of our lab specialists." },
  { icon: <Globe className="w-5 h-5" />, title: "International Inquiries", desc: "Reach our global partnerships team for franchise and export inquiries." },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = (data: any) => api.post("/api/inquiries", data);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.organization || !form.organizationType || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await submitInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        organization: form.organization,
        organizationType: form.organizationType,
        subject: form.subject,
        message: form.message,
      });
      setSubmitted(true);
      setForm(INITIAL);
      toast.success("Inquiry submitted! We'll get back to you within 24 hours.");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 uppercase tracking-widest">
              Contact & Inquiry
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let{"'"}s Build Something{" "}
              <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you{"'"}re a school principal, college dean, or global education partner — our team is ready to help you set up the perfect AI & STEM lab.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactDetails.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{c.title}</p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">{l}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div id="contact-form" className="scroll-mt-24" />
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      Thank You!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Your inquiry has been received. A NITAI education consultant will contact you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="font-semibold">
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                    <p className="text-muted-foreground mb-7 text-sm">
                      Fill in the form below and our team will respond within 24 hours.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                          <Input
                            id="name"
                            placeholder="John Smith"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@school.edu"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="org">Institution Name <span className="text-destructive">*</span></Label>
                          <Input
                            id="org"
                            placeholder="ABC Public School"
                            value={form.organization}
                            onChange={(e) => handleChange("organization", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label>Institution Type <span className="text-destructive">*</span></Label>
                          <Select
                            value={form.organizationType}
                            onValueChange={(v) => handleChange("organizationType", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="school">School (K-12)</SelectItem>
                              <SelectItem value="college">College / Polytechnic</SelectItem>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="coaching">Coaching Institute</SelectItem>
                              <SelectItem value="ngo">NGO / Trust</SelectItem>
                              <SelectItem value="government">Government Body</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Inquiry Subject <span className="text-destructive">*</span></Label>
                          <Select
                            value={form.subject}
                            onValueChange={(v) => handleChange("subject", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lab-setup">Lab Setup & Installation</SelectItem>
                              <SelectItem value="demo">Request a Demo</SelectItem>
                              <SelectItem value="pricing">Pricing & Quotation</SelectItem>
                              <SelectItem value="teacher-training">Teachers Training</SelectItem>
                              <SelectItem value="partnership">Partnership / Franchise</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="Tell us about your institution, the number of students, your goals, and any specific requirements..."
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full font-semibold"
                        size="lg"
                      >
                        {submitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> Send Inquiry
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6"
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-3">Why Contact Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Free consultation with an education expert",
                    "Custom lab proposal within 48 hours",
                    "Site visit option available",
                    "Flexible EMI & payment options",
                    "Government tender assistance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {supportOptions.map((opt, i) => {
                const href = opt.title === "WhatsApp Support"
                  ? "https://wa.me/919340952324"
                  : opt.title === "Demo Request"
                    ? "#contact-form"
                    : "mailto:nitaigroup.12@gmail.com?subject=International%20Inquiry";

                return (
                  <motion.div
                    key={opt.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => {
                      if (href === "#contact-form") {
                        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.open(href, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {opt.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{opt.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-teal-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-foreground text-sm">New Delhi, India</p>
                    <p className="text-xs text-muted-foreground">Headquarters</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground text-center">
                    Regional offices in Mumbai, Bangalore, Hyderabad, Chennai & Dubai
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
