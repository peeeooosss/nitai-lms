import LabPageTemplate from "./_components/LabPageTemplate.tsx";
import type { LabPageData } from "./_components/LabPageTemplate.tsx";

const data: LabPageData = {
  id: "autonomous-lab",
  emoji: "🤖",
  title: "Autonomous Systems Lab",
  tagline: "Self-Driving Future",
  description: "Design and deploy autonomous vehicles, drones, and robotic systems using AI, computer vision, sensor fusion, and ROS — the future of mobility.",
  heroImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1400&q=80",
  gradient: "from-red-500/20 to-rose-500/10",
  accentColor: "bg-red-500/10 text-red-600 border border-red-500/20",
  ageGroup: "Grade 10–PG",
  duration: "150 hrs/year",
  overview:
    "Design, build, and deploy fully autonomous vehicles, drones, and robotic systems using AI, computer vision, sensor fusion, and the Robot Operating System (ROS). Students program real self-driving car kits, autonomous delivery drones, and mobile robots — preparing them for careers at the forefront of the mobility revolution, autonomous technology, and intelligent systems engineering.",
  keyFeatures: [
    {
      title: "Self-Driving Car Kit",
      desc:
        "Program a 1:10 scale autonomous vehicle with lidar, cameras, and ultrasonic sensors to navigate tracks and avoid obstacles.",
      icon: "Car",
    },
    {
      title: "Autonomous Drone",
      desc:
        "Code mission-based drone flights: autonomous takeoff, waypoint navigation, landing, and object detection from above.",
      icon: "Wind",
    },
    {
      title: "ROS Framework",
      desc:
        "Master the Robot Operating System — nodes, topics, services, and transforms — the universal language of modern robotics.",
      icon: "Terminal",
    },
    {
      title: "Computer Vision Nav",
      desc:
        "Implement real-time lane detection, stop sign recognition, and object tracking using OpenCV and YOLO neural networks.",
      icon: "Eye",
    },
    {
      title: "Sensor Fusion",
      desc:
        "Combine data from lidar, cameras, IMUs, and GPS using Kalman filters to create robust, reliable autonomous perception.",
      icon: "Radio",
    },
    {
      title: "Real-World Testing Track",
      desc:
        "A dedicated miniature road track environment for deploying and testing student-built autonomous vehicles and robots.",
      icon: "Map",
    },
  ],
  curriculum: [
    {
      level: "Beginner",
      topics: [
        "Introduction to autonomous systems and robotics",
        "Sensors: lidar, ultrasonic, camera, and IMU",
        "Python for robotics: control loops and sensor reading",
        "Basic computer vision with OpenCV",
        "Manual-to-autonomous transition: PWM and motor control",
        "Safety systems for autonomous vehicles",
      ],
    },
    {
      level: "Intermediate",
      topics: [
        "ROS 2 fundamentals: publishers, subscribers, and services",
        "Lane detection and road following algorithms",
        "SLAM: simultaneous localization and mapping",
        "Autonomous drone programming with MAVLink",
        "PID control for stable autonomous navigation",
        "Object detection with YOLO on embedded hardware",
      ],
    },
    {
      level: "Advanced",
      topics: [
        "Sensor fusion with Extended Kalman Filter",
        "Path planning: A*, Dijkstra, and RRT algorithms",
        "Behavior trees for complex autonomous decision-making",
        "Simulation with Gazebo and RViz before real-world deployment",
        "V2X communication and multi-robot coordination",
        "Capstone: fully autonomous vehicle demo on real track",
      ],
    },
  ],
  outcomes: [
    "Hands-on portfolio of self-driving car, drone, and robot projects",
    "ROS 2 proficiency — the standard framework for all professional robotics roles",
    "Computer vision skills applicable to automotive, logistics, and defense sectors",
    "Competitive readiness for World Robot Olympiad and autonomous vehicle competitions",
    "Strong foundation for careers at Tesla, Waymo, Nuro, and Indian AV startups",
    "Preparation for M.Tech, MS, and PhD programs in robotics and autonomous systems",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e?w=800&q=80",
    "https://images.unsplash.com/photo-1622258415402-d6f597973b03?w=800&q=80",
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&q=80",
  ],
  kitIncludes: [
    "1:10 Scale Autonomous Vehicle Kit with lidar, camera, and Jetson Nano",
    "Programmable Autonomous Drone with GPS and obstacle avoidance module",
    "ROS 2 Lab Environment: pre-configured Ubuntu workstation image",
    "Sensor Fusion Component Pack: IMU, ultrasonic array, and encoder modules",
    "Miniature Road Track Kit: lane markings, signs, and obstacle props",
  ],
};

export default function AutonomousLabPage() {
  return <LabPageTemplate lab={data} />;
}
