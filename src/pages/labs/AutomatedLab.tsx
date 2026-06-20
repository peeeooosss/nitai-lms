import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "automated-lab",
  emoji: "⚡",
  title: "Automated Systems Lab",
  tagline: "Automate Everything",
  description: "Industrial and process automation using PLCs, SCADA, sensors, and no-code workflow tools — bridging academia and Industry 4.0 requirements.",
  heroImage: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1400&q=80",
  gradient: "from-amber-500/20 to-orange-500/10",
  accentColor: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  ageGroup: "Grade 9–PG",
  duration: "120 hrs/year",
  overview:
    "Industrial and process automation using real-world tools deployed in factories across the globe — PLCs, SCADA systems, HMIs, industrial sensors, and conveyor systems. Students also master no-code workflow automation with modern platforms, bridging the gap between academic learning and Industry 4.0 requirements sought by manufacturers, utilities, and process industries.",
  keyFeatures: [
    {
      title: "PLC Programming",
      desc:
        "Program industry-standard Siemens and Allen-Bradley PLCs using ladder logic, function block diagrams, and structured text.",
      icon: "Cpu",
    },
    {
      title: "SCADA Systems",
      desc:
        "Design supervisory control and data acquisition interfaces that monitor and control industrial processes in real time.",
      icon: "Monitor",
    },
    {
      title: "Conveyor Automation",
      desc:
        "Build and program a miniature conveyor and sorting system using sensors, actuators, and PLC logic from scratch.",
      icon: "MoveRight",
    },
    {
      title: "No-Code Automation",
      desc:
        "Master Make.com, Zapier, and Power Automate to build enterprise-grade workflow automations without writing code.",
      icon: "Workflow",
    },
    {
      title: "Industry 4.0 Projects",
      desc:
        "Implement IIoT, predictive maintenance, and smart factory solutions connecting physical systems to cloud dashboards.",
      icon: "Factory",
    },
    {
      title: "Factory Simulation",
      desc:
        "Use Factory I/O and Siemens TIA Portal simulation environments to design, test, and optimize production lines virtually.",
      icon: "Play",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Introduction to industrial automation and control systems",
        "Sensors and actuators: types, specs, and wiring",
        "PLC basics: architecture, I/O modules, and programming",
        "Ladder logic fundamentals: contacts, coils, and timers",
        "Introduction to no-code automation with Zapier",
        "Safety systems and industrial standards overview",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "Advanced PLC programming: function blocks and structured text",
        "HMI design and SCADA system configuration",
        "Conveyor and sorting system build project",
        "IIoT: connecting PLCs to MQTT and cloud dashboards",
        "Make.com automation workflows and scenario building",
        "Process control: PID loops and feedback systems",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Full SCADA project: design, deploy, and monitor",
        "Predictive maintenance with sensor data and ML",
        "Industry 4.0 architecture and digital transformation",
        "Factory simulation with Factory I/O and TIA Portal",
        "Energy management and sustainable automation",
        "Capstone: end-to-end automated production line project",
      ],
    },
  ],
  outcomes: [
    "Industry-ready PLC and SCADA skills valued by manufacturing companies",
    "Certification aligned with Siemens and Rockwell Automation partner programs",
    "Ability to design and deploy IIoT solutions for smart factories",
    "Proficiency in no-code automation tools used by enterprises globally",
    "Strong foundation for industrial engineering, mechatronics, and automation degrees",
    "Competitive readiness for MSBTE, NSQF, and AICTE skill certifications",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "1× Miniature PLC Training Kit (Siemens S7-1200 compatible)",
    "Conveyor Belt & Sorting Automation Model with sensors and actuators",
    "Factory I/O Simulation Software License (1-year)",
    "Industrial Sensor Pack: proximity, photoelectric, and temperature sensors",
    "No-Code Automation Workbook with 30 enterprise workflow templates",
  ],
};

export default function AutomatedLabPage() {
  return <LabPageTemplate lab={data} />;
}
