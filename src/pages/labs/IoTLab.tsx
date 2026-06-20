import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "iot-lab",
  emoji: "📡",
  title: "IoT Lab",
  tagline: "Connect Everything",
  description:
    "Build smart systems that sense, think, and respond. The NITAI IoT Lab teaches students to wire up real-world sensors, write firmware, and connect devices to the cloud.",
  heroImage: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=1400&q=80",
  gradient: "from-emerald-500/20 to-teal-500/10",
  accentColor: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  overview:
    "The Internet of Things is reshaping industries — and the NITAI IoT Lab prepares students to be its builders. Starting with basic circuits and working up to fully cloud-connected systems, students build smart agriculture monitors, weather stations, home automation systems, and industrial IoT prototypes. The lab includes Arduino and ESP32 boards, a cloud data platform, and a rich library of guided projects.",
  keyFeatures: [
    { icon: "🌡️", title: "Real Sensor Projects", desc: "Temperature, humidity, motion, gas, and soil sensors for building real-world monitoring systems." },
    { icon: "☁️", title: "Cloud Dashboard", desc: "Stream live sensor data to NITAI's cloud platform with real-time graphs and alerts." },
    { icon: "🔌", title: "Microcontroller Kits", desc: "Arduino Uno, ESP32/ESP8266 boards with WiFi and Bluetooth for wireless connectivity." },
    { icon: "📱", title: "Mobile App Control", desc: "Students build simple mobile apps to control their IoT devices remotely." },
    { icon: "🌱", title: "Smart Agriculture Module", desc: "Special project module on precision farming and environmental monitoring." },
    { icon: "🔐", title: "IoT Security Basics", desc: "Introduction to device security, authentication, and safe data transmission." },
  ],
  curriculum: [
    {
      level: "Beginner (Grade 6–8)",
      topics: ["What is IoT?", "Circuits and breadboarding", "LED and sensor basics", "Reading sensor data", "Serial monitor basics"],
    },
    {
      level: "Intermediate (Grade 9–11)",
      topics: ["Arduino programming", "Multiple sensor integration", "WiFi communication", "Cloud data logging", "Smart home project"],
    },
    {
      level: "Advanced (Grade 12 / College)",
      topics: ["MQTT protocol", "Edge computing basics", "Custom PCB design intro", "Industry IoT standards", "Capstone IoT product"],
    },
  ],
  outcomes: [
    "Build circuits with real electronic components",
    "Program microcontrollers using C/Python",
    "Connect devices to the internet and cloud",
    "Visualize and analyze sensor data",
    "Design complete IoT product prototypes",
    "Understand IoT security fundamentals",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80",
    "https://images.unsplash.com/photo-1730967844913-29eb5cae5f34?w=400&q=80",
    "https://images.unsplash.com/photo-1702390796625-6dd9b46b1c0b?w=400&q=80",
    "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80",
  ],
  ageGroup: "Ages 11–22",
  duration: "Academic Year",
  kitIncludes: ["Arduino Uno x5", "ESP32 Boards x5", "Sensor Starter Pack", "Breadboard & Wires", "Cloud Platform Access", "LCD Display Modules", "Power Supply Units", "Project Guide Book"],
};

export default function IoTLabPage() {
  return <LabPageTemplate lab={data} />;
}
