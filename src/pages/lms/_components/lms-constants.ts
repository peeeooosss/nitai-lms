import { BookOpen, Cpu, Bot, Wifi, Glasses, Code2, FlaskConical, Palette, Wrench, Rocket, Microscope, Lightbulb, Wand2, Brain, Zap, Car, Target, Globe, Users } from "lucide-react";

export const LAB_MODULES = [
  { id: "all", label: "All Labs", icon: BookOpen, color: "text-primary" },
  { id: "ai", label: "AI Lab", icon: Brain, color: "text-violet-500" },
  { id: "robotics", label: "Robotics Lab", icon: Bot, color: "text-blue-500" },
  { id: "iot", label: "IoT Lab", icon: Wifi, color: "text-green-500" },
  { id: "arvr", label: "AR/VR Lab", icon: Glasses, color: "text-pink-500" },
  { id: "coding", label: "Coding Lab", icon: Code2, color: "text-yellow-500" },
  { id: "stem", label: "STEM Lab", icon: FlaskConical, color: "text-red-500" },
  { id: "creator", label: "Creator Lab", icon: Palette, color: "text-orange-500" },
  { id: "skill", label: "Skill Lab", icon: Wrench, color: "text-teal-500" },
  { id: "space", label: "Space Lab", icon: Rocket, color: "text-indigo-500" },
  { id: "rnd", label: "R&D Lab", icon: Microscope, color: "text-cyan-500" },
  { id: "incubation", label: "Incubation Lab", icon: Lightbulb, color: "text-amber-500" },
  { id: "ai-tools", label: "AI Tools Lab", icon: Wand2, color: "text-purple-500" },
  { id: "agentic-ai", label: "Agentic AI Lab", icon: Zap, color: "text-fuchsia-500" },
  { id: "automated", label: "Automated Lab", icon: Target, color: "text-lime-500" },
  { id: "autonomous", label: "Autonomous Lab", icon: Car, color: "text-sky-500" },
  { id: "ir50", label: "IR50 Lab", icon: Globe, color: "text-emerald-500" },
  { id: "future-workforce", label: "Future Workforce", icon: Users, color: "text-rose-500" },
  { id: "ai-ed", label: "AI Education", icon: Cpu, color: "text-blue-400" },
] as const;

export const CLASS_LEVELS = [
  { value: 0, label: "All Classes" },
  { value: 1, label: "Class 1" },
  { value: 2, label: "Class 2" },
  { value: 3, label: "Class 3" },
  { value: 4, label: "Class 4" },
  { value: 5, label: "Class 5" },
  { value: 6, label: "Class 6" },
  { value: 7, label: "Class 7" },
  { value: 8, label: "Class 8" },
  { value: 9, label: "Class 9" },
  { value: 10, label: "Class 10" },
  { value: 11, label: "Class 11" },
  { value: 12, label: "Class 12" },
] as const;
