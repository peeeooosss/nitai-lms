import { motion, type TargetAndTransition } from "motion/react";
import { useEffect, useState } from "react";

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

type MascotProps = {
  className?: string;
  color?: string;
  size?: number;
  onClick?: () => void;
};

type Mood = "idle" | "wave" | "jump" | "spin";

export default function Mascot({ className = "", color, size = 50, onClick }: MascotProps) {
  const [mood, setMood] = useState<Mood>("idle");
  const [catColor, setCatColor] = useState(color ?? COLORS[0]);

  useEffect(() => {
    const moods: Mood[] = ["wave", "jump", "spin"];
    const interval = setInterval(() => {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(randomMood);
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setCatColor(randomColor);
      setTimeout(() => setMood("idle"), 1200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const animations: Record<Mood, TargetAndTransition> = {
    idle: {
      y: [0, -3, 0],
      rotate: [0, 2, -2, 0],
    },
    wave: {
      rotate: [0, -15, 15, -15, 15, 0],
      scale: [1, 1.1, 1],
    },
    jump: {
      y: [0, -20, 0],
      scale: [1, 0.9, 1.05, 1],
    },
    spin: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
    },
  };

  return (
    <motion.div
      className={`cursor-pointer select-none ${className}`}
      animate={animations[mood]}
      transition={{
        duration: mood === "idle" ? 3 : 0.8,
        repeat: mood === "idle" ? Infinity : 0,
        ease: "easeInOut",
      }}
      onClick={onClick}
      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="25" cy="30" rx="15" ry="14" fill={catColor} />
        <circle cx="25" cy="16" r="11" fill={catColor} />
        <polygon points="16,8 14,0 21,6" fill={catColor} />
        <polygon points="34,8 36,0 29,6" fill={catColor} />
        <circle cx="21" cy="14" r="3" fill="white" />
        <circle cx="29" cy="14" r="3" fill="white" />
        <circle cx="22" cy="14" r="1.5" fill="#333" />
        <circle cx="30" cy="14" r="1.5" fill="#333" />
        <ellipse cx="25" cy="18" rx="1.5" ry="1" fill="#FF8C8C" />
        <line x1="12" y1="17" x2="19" y2="18" stroke="#333" strokeWidth="0.5" />
        <line x1="12" y1="20" x2="19" y2="19" stroke="#333" strokeWidth="0.5" />
        <line x1="38" y1="17" x2="31" y2="18" stroke="#333" strokeWidth="0.5" />
        <line x1="38" y1="20" x2="31" y2="19" stroke="#333" strokeWidth="0.5" />
        <path d="M38 35 Q45 30 42 22" stroke={catColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
