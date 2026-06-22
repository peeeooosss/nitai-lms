import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { useAuth } from "@/hooks/use-auth.ts";
import { useNavigate } from "react-router-dom";
import Navbar from "../_components/Navbar.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Rocket, Zap, Flame, Fuel, Star, Award, ArrowRight,
  Brain, Bot, Wifi, Glasses, Code2, FlaskConical, Palette,
  Wrench, Microscope, Lightbulb, Wand2, Target, Car, Globe, Users, Cpu,
} from "lucide-react";

const FREE_TRIAL_LIMIT = 5;

const LABS = [
  { id: "ai", label: "AI Lab", icon: Brain, color: "text-violet-500", bg: "bg-violet-500/10", path: "/labs/ai" },
  { id: "robotics", label: "Robotics Lab", icon: Bot, color: "text-blue-500", bg: "bg-blue-500/10", path: "/labs/robotics" },
  { id: "iot", label: "IoT Lab", icon: Wifi, color: "text-green-500", bg: "bg-green-500/10", path: "/labs/iot" },
  { id: "arvr", label: "AR/VR Lab", icon: Glasses, color: "text-pink-500", bg: "bg-pink-500/10", path: "/labs/arvr" },
  { id: "coding", label: "Coding Lab", icon: Code2, color: "text-yellow-500", bg: "bg-yellow-500/10", path: "/labs/coding" },
  { id: "stem", label: "STEM Lab", icon: FlaskConical, color: "text-red-500", bg: "bg-red-500/10", path: "/labs/stem" },
  { id: "creator", label: "Creator Lab", icon: Palette, color: "text-orange-500", bg: "bg-orange-500/10", path: "/labs/creator" },
  { id: "skill", label: "Skill Lab", icon: Wrench, color: "text-teal-500", bg: "bg-teal-500/10", path: "/labs/skill" },
  { id: "space", label: "Space Lab", icon: Rocket, color: "text-indigo-500", bg: "bg-indigo-500/10", path: "/labs/space" },
  { id: "rnd", label: "R&D Lab", icon: Microscope, color: "text-cyan-500", bg: "bg-cyan-500/10", path: "/labs/rnd" },
  { id: "incubation", label: "Incubation Lab", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10", path: "/labs/incubation" },
  { id: "ai-tools", label: "AI Tools Lab", icon: Wand2, color: "text-purple-500", bg: "bg-purple-500/10", path: "/labs/ai-tools" },
  { id: "agentic-ai", label: "Agentic AI Lab", icon: Zap, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", path: "/labs/agentic-ai" },
  { id: "automated", label: "Automated Lab", icon: Target, color: "text-lime-500", bg: "bg-lime-500/10", path: "/labs/automated" },
  { id: "autonomous", label: "Autonomous Lab", icon: Car, color: "text-sky-500", bg: "bg-sky-500/10", path: "/labs/autonomous" },
  { id: "ir50", label: "IR50 Lab", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-500/10", path: "/labs/ir50" },
  { id: "future-workforce", label: "Future Workforce", icon: Users, color: "text-rose-500", bg: "bg-rose-500/10", path: "/labs/future-workforce" },
  { id: "picto", label: "Picto Lab", icon: Palette, color: "text-pink-400", bg: "bg-pink-400/10", path: "/products/picto-lab" },
  { id: "python", label: "Python Lab", icon: Code2, color: "text-blue-400", bg: "bg-blue-400/10", path: "/products/python-lab" },
];

const RANKS = [
  { minXp: 0, title: "Cadet", icon: "🌱" },
  { minXp: 100, title: "Recruit", icon: "⭐" },
  { minXp: 300, title: "Explorer", icon: "🚀" },
  { minXp: 600, title: "Navigator", icon: "🧭" },
  { minXp: 1000, title: "Pilot", icon: "🛸" },
  { minXp: 2000, title: "Commander", icon: "⚡" },
  { minXp: 5000, title: "Captain", icon: "👨‍🚀" },
  { minXp: 10000, title: "Admiral", icon: "🌟" },
];

function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

function getNextRank(xp: number) {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].minXp) return RANKS[i];
  }
  return null;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const profile = useQuery(api.users.getProfile);
  const trialsLeft = FREE_TRIAL_LIMIT - (profile?.trialsUsed ?? 0);
  const xp = profile?.totalXp ?? 0;
  const rank = getRank(xp);
  const nextRank = getNextRank(xp);

  if (user === undefined || profile === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{profile?.avatar ?? "🧑‍🚀"}</span>
              <div>
                <h1 className="font-display font-bold text-2xl">{profile?.name ?? "Cadet"}</h1>
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <span>{rank.icon}</span>
                  <span>{rank.title}</span>
                  <span className="text-xs text-muted-foreground/60">•</span>
                  <span className="text-sm">{xp} XP</span>
                </p>
              </div>
            </div>

            {nextRank && (
              <div className="bg-background/50 rounded-xl p-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Progress to {nextRank.icon} {nextRank.title}</span>
                  <span>{xp} / {nextRank.minXp} XP</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${Math.min((xp / nextRank.minXp) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-64 rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Fuel className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-sm">Fuel Cells</span>
            </div>
            <div className="flex gap-1.5 mb-3">
              {Array.from({ length: FREE_TRIAL_LIMIT }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-3 rounded-full transition-all ${
                    i < trialsLeft
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm shadow-emerald-500/30"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {trialsLeft > 0
                ? `${trialsLeft} free trial${trialsLeft !== 1 ? "s" : ""} remaining`
                : "All trials used — subscribe to continue"}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Lab Station
            </h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate("/lms")}>
              LMS Courses <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {LABS.map((lab) => {
              const Icon = lab.icon;
              return (
                <button
                  key={lab.id}
                  onClick={() => navigate(lab.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 bg-card hover:bg-accent/5 transition-all group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg ${lab.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${lab.color}`} />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">{lab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-lg flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            Badges & Achievements
          </h2>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Complete challenges to earn badges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
