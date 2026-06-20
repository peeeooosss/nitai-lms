import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const labs = [
  // Original 8
  {
    id: "ai-lab", emoji: "🤖", title: "AI Lab", tagline: "Intelligence Unleashed", href: "/labs/ai",
    description: "Hands-on AI curriculum covering machine learning, deep learning, computer vision, and NLP — designed for every learning level.",
    features: ["Machine Learning", "Computer Vision", "NLP & Chatbots"],
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=600&q=80",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "robotics-lab", emoji: "⚙️", title: "Robotics Lab", tagline: "Build. Program. Innovate.", href: "/labs/robotics",
    description: "Full-spectrum robotics education from basic automation to advanced autonomous robots. Students build, code, and compete.",
    features: ["Robot Building", "Arduino & Pi", "Competitions"],
    image: "https://images.unsplash.com/photo-1743677077216-00a458eff9e0?w=600&q=80",
    gradient: "from-orange-500/20 to-red-500/10",
  },
  {
    id: "iot-lab", emoji: "📡", title: "IoT Lab", tagline: "Connect Everything", href: "/labs/iot",
    description: "Internet of Things education using real sensors, microcontrollers, and cloud platforms to solve real-world challenges.",
    features: ["Smart Sensors", "Cloud Integration", "Smart Devices"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "arvr-lab", emoji: "🥽", title: "AR/VR Lab", tagline: "Beyond Reality", href: "/labs/arvr",
    description: "Immersive AR and VR experiences that revolutionize how students learn complex concepts through simulation.",
    features: ["VR Simulations", "AR Applications", "3D Modeling"],
    image: "https://images.unsplash.com/photo-1538388149542-5e24932d11a8?w=600&q=80",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    id: "coding-lab", emoji: "💻", title: "Coding Lab", tagline: "Write Tomorrow", href: "/labs/coding",
    description: "Comprehensive coding education from block-based programming for beginners to professional-grade development.",
    features: ["Block Coding", "Python & JS", "App Development"],
    image: "https://images.unsplash.com/photo-1653566031536-4d1b6a9da15e?w=600&q=80",
    gradient: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "stem-lab", emoji: "🔬", title: "STEM Lab", tagline: "Experiment. Discover. Excel.", href: "/labs/stem",
    description: "Integrated Science, Technology, Engineering, and Mathematics through project-based real-world challenges.",
    features: ["Project-Based Learning", "Engineering Design", "Math Modeling"],
    image: "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=600&q=80",
    gradient: "from-green-500/20 to-lime-500/10",
  },
  {
    id: "creator-lab", emoji: "🎨", title: "Creator Lab", tagline: "Create. Design. Inspire.", href: "/labs/creator",
    description: "Digital design, 3D printing, video production, and creative technology to develop the next generation of makers.",
    features: ["3D Printing", "Digital Design", "Video Production"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: "skill-lab", emoji: "🎯", title: "Skill Lab", tagline: "Future-Ready Skills", href: "/labs/skill",
    description: "21st-century skill development including critical thinking, communication, collaboration, and creativity.",
    features: ["Critical Thinking", "Leadership", "Entrepreneurship"],
    image: "https://images.unsplash.com/photo-1705579610984-910ad33fe2db?w=600&q=80",
    gradient: "from-indigo-500/20 to-blue-500/10",
  },
  // 9 New Labs
  {
    id: "space-lab", emoji: "🚀", title: "Space & Satellite Lab", tagline: "Reach for the Stars", href: "/labs/space",
    description: "Explore aerospace, satellite technology, drone programming, and space science — preparing students for the new space economy.",
    features: ["Satellite Tech", "Drone Programming", "Space Science"],
    image: "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?w=600&q=80",
    gradient: "from-slate-500/20 to-blue-500/10",
  },
  {
    id: "rnd-lab", emoji: "🧪", title: "R&D & Innovation Lab", tagline: "Research. Innovate. Patent.", href: "/labs/rnd",
    description: "A full research & development lab where students ideate, prototype, research and file patents — the innovation pipeline from concept to commercialization.",
    features: ["Prototyping", "Patent Filing", "Research Methods"],
    image: "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=600&q=80",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "incubation-lab", emoji: "🌱", title: "Incubation & Startup Lab", tagline: "Build Your Startup", href: "/labs/incubation",
    description: "From idea to startup — students get mentorship, funding access, pitch training, and the ecosystem to build real ventures from campus.",
    features: ["Startup Mentorship", "Pitch Training", "Funding Access"],
    image: "https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?w=600&q=80",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "ai-tools-lab", emoji: "🛠️", title: "AI Tools Lab", tagline: "Master Every AI Tool", href: "/labs/ai-tools",
    description: "Practical mastery of 100+ AI tools — ChatGPT, Midjourney, Gemini, Copilot, and more — for productivity, creativity, and professional applications.",
    features: ["100+ AI Tools", "Prompt Engineering", "AI Workflows"],
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=600&q=80",
    gradient: "from-cyan-500/20 to-teal-500/10",
  },
  {
    id: "agentic-ai-lab", emoji: "🧠", title: "Agentic AI Lab", tagline: "Build Thinking Machines", href: "/labs/agentic-ai",
    description: "Advanced lab on autonomous AI agents — LangChain, AutoGPT, multi-agent systems, and AI orchestration for real-world automation.",
    features: ["AI Agents", "LangChain", "Multi-Agent Systems"],
    image: "https://images.unsplash.com/photo-1744640326166-433469d102f2?w=600&q=80",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "automated-lab", emoji: "⚡", title: "Automated Systems Lab", tagline: "Automate Everything", href: "/labs/automated",
    description: "Industrial and process automation using PLCs, SCADA, sensors, and workflow automation tools — bridging academia and industry 4.0.",
    features: ["PLC & SCADA", "Process Automation", "Industry 4.0"],
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&q=80",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "autonomous-lab", emoji: "🤖", title: "Autonomous Systems Lab", tagline: "Self-Driving Future", href: "/labs/autonomous",
    description: "Design and deploy autonomous vehicles, drones, and systems using AI, computer vision, and sensor fusion — the future of mobility.",
    features: ["Autonomous Vehicles", "Drone AI", "Sensor Fusion"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80",
    gradient: "from-red-500/20 to-rose-500/10",
  },
  {
    id: "ir50-lab", emoji: "🏭", title: "Future Industry Lab IR 5.0", tagline: "Human + Machine Harmony", href: "/labs/ir50",
    description: "Industry Revolution 5.0 — where human creativity meets AI power. Collaborative robotics, sustainable manufacturing, and human-centric technology.",
    features: ["Collaborative Robots", "Sustainable Mfg", "Human-AI Teams"],
    image: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=600&q=80",
    gradient: "from-teal-500/20 to-cyan-500/10",
  },
  {
    id: "future-workforce-lab", emoji: "💼", title: "Future Workforce Lab", tagline: "Earn While You Learn", href: "/labs/future-workforce",
    description: "The ultimate earn-while-you-learn lab — connecting students with real projects, freelancing, internships, and global job opportunities from Day 1.",
    features: ["Freelancing", "Global Jobs", "Internships"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    gradient: "from-yellow-500/20 to-lime-500/10",
  },
];

export default function LabsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="labs" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            17 Specialized Labs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            World-Class Learning Labs
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From AI and Robotics to Space, Agentic AI, Autonomous Systems and Future Industry IR 5.0 — each lab is purpose-built to create future-ready leaders and startup innovators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LabCard({ lab, index }: { lab: (typeof labs)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      id={lab.id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${lab.gradient}`}>
        <img src={lab.image} alt={lab.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3 text-3xl">{lab.emoji}</div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">{lab.title}</h3>
        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{lab.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{lab.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lab.features.map((f) => (
            <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{f}</span>
          ))}
        </div>
        <Link to={lab.href} className="flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-3 transition-all cursor-pointer">
          Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
