import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "space-lab",
  emoji: "🚀",
  title: "Space & Satellite Lab",
  tagline: "Reach for the Stars",
  description: "Explore aerospace engineering, satellite communication, drone programming, rocketry, and space science — preparing students for ISRO, NASA programs and the new space economy.",
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
  gradient: "from-slate-500/20 to-blue-500/10",
  accentColor: "bg-slate-500/10 text-slate-600 border border-slate-500/20",
  ageGroup: "Grade 8–PG",
  duration: "120 hrs/year",
  overview:
    "Explore the final frontier through hands-on aerospace engineering, satellite communication, drone programming, rocketry basics, and space science. Students build and launch model rockets, program drones, design CubeSat payloads, and simulate orbital missions — preparing them for ISRO Young Scientist programs, NASA competitions, and a career in the booming new space economy.",
  keyFeatures: [
    {
      title: "Satellite Model Kit",
      desc:
        "Assemble a functional scale CubeSat model with real sensors, power systems, and communication modules.",
      icon: "Satellite",
    },
    {
      title: "Drone Programming",
      desc:
        "Code autonomous flight paths, obstacle avoidance, and payload delivery missions using Python and block-based IDEs.",
      icon: "Wind",
    },
    {
      title: "Rocketry Basics",
      desc:
        "Design, build, and launch model rockets while learning propulsion, aerodynamics, and recovery systems.",
      icon: "Rocket",
    },
    {
      title: "Space Science Simulations",
      desc:
        "Use NASA-grade simulation software to model planetary motion, orbital mechanics, and re-entry dynamics.",
      icon: "Globe",
    },
    {
      title: "ISRO/NASA Curriculum Alignment",
      desc:
        "Content mapped to ISRO Young Scientist and NASA Student Airborne Research programs for seamless competition readiness.",
      icon: "BookOpen",
    },
    {
      title: "Hackathon Challenges",
      desc:
        "Monthly space hackathons where teams solve real mission briefs issued by partner space agencies and startups.",
      icon: "Trophy",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Introduction to space exploration history",
        "Solar system and celestial mechanics",
        "Satellite basics: orbits and applications",
        "Model rocket design and safety",
        "Introduction to drone hardware and flight",
        "Space careers and industry overview",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Drone flight code with Python/Dronekit",
        "CubeSat design and payload integration",
        "Orbital mechanics and Kepler's laws",
        "Satellite communication protocols",
        "Remote sensing and earth observation",
        "Team space mission design challenge",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Full satellite communication link budget",
        "Launch simulation and trajectory optimization",
        "Space mission planning and systems engineering",
        "Astrodynamics with MATLAB/Python",
        "Space debris and sustainability protocols",
        "Capstone: end-to-end CubeSat mission proposal",
      ],
    },
  ],
  outcomes: [
    "Eligibility and preparation for ISRO Young Scientist & Yuvika programs",
    "Portfolio of rocket, drone, and CubeSat design projects",
    "Foundation for aerospace engineering and astrophysics degrees",
    "Exposure to careers at ISRO, DRDO, NSIL, and space startups",
    "Skills in Python-based drone programming and flight automation",
    "Participation in national and international space hackathons",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "1× Model Rocket Kit with launch pad and igniters",
    "1× Programmable Drone with GPS and obstacle sensors",
    "1× CubeSat Frame with solar panel and radio module",
    "Orbital Mechanics Simulation Software (1-year license)",
    "Space Science Component Pack: gyroscopes, magnetometers, barometric sensors",
  ],
};

export default function SpaceLabPage() {
  return <LabPageTemplate lab={data} />;
}
