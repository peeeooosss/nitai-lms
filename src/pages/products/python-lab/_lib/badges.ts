export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
  color: string;
};

export const BADGES: Badge[] = [
  { id: "first-code", name: "First Code", description: "Complete your first Python challenge", icon: "🐣", xpRequired: 0, color: "from-green-400 to-emerald-500" },
  { id: "beginner", name: "Python Beginner", description: "Earn 100 XP", icon: "🌱", xpRequired: 100, color: "from-blue-400 to-cyan-500" },
  { id: "print-master", name: "Print Master", description: "Complete all Hello World challenges", icon: "🖨️", xpRequired: 200, color: "from-purple-400 to-violet-500" },
  { id: "var-virtuoso", name: "Variable Virtuoso", description: "Complete all Variables challenges", icon: "📦", xpRequired: 350, color: "from-teal-400 to-cyan-500" },
  { id: "string-slinger", name: "String Slinger", description: "Complete all Strings challenges", icon: "🔤", xpRequired: 500, color: "from-pink-400 to-rose-500" },
  { id: "condition-king", name: "Condition King", description: "Complete all Conditions challenges", icon: "🧩", xpRequired: 700, color: "from-orange-400 to-amber-500" },
  { id: "loop-legacy", name: "Loop Legacy", description: "Complete all Loops challenges", icon: "🔄", xpRequired: 900, color: "from-indigo-400 to-purple-500" },
  { id: "list-lord", name: "List Lord", description: "Complete all Lists challenges", icon: "📋", xpRequired: 1100, color: "from-red-400 to-rose-500" },
  { id: "function-fanatic", name: "Function Fanatic", description: "Complete all Functions challenges", icon: "⚙️", xpRequired: 1300, color: "from-yellow-400 to-amber-500" },
  { id: "dict-dynamo", name: "Dict Dynamo", description: "Complete all Dictionaries challenges", icon: "📖", xpRequired: 1500, color: "from-lime-400 to-green-500" },
  { id: "project-pro", name: "Project Pro", description: "Complete a mini project", icon: "🚀", xpRequired: 1700, color: "from-sky-400 to-blue-500" },
  { id: "python-master", name: "Python Master", description: "Earn 2000 XP total", icon: "🐍", xpRequired: 2000, color: "from-blue-500 to-purple-600" },
  { id: "speed-coder", name: "Speed Coder", description: "Complete 5 challenges in a row", icon: "⚡", xpRequired: 250, color: "from-yellow-400 to-orange-500" },
  { id: "bug-hunter", name: "Bug Hunter", description: "Fix your code on the first try 3 times", icon: "🐛", xpRequired: 400, color: "from-red-400 to-pink-500" },
  { id: "persistent", name: "Never Give Up", description: "Use hints 5 times", icon: "💪", xpRequired: 300, color: "from-amber-400 to-yellow-500" },
];

export const XP_LEVELS = [
  { level: 1, name: "Novice", minXp: 0, icon: "🌱" },
  { level: 2, name: "Apprentice", minXp: 200, icon: "🔰" },
  { level: 3, name: "Coder", minXp: 500, icon: "💻" },
  { level: 4, name: "Pythonista", minXp: 1000, icon: "🐍" },
  { level: 5, name: "Pro", minXp: 1500, icon: "⭐" },
  { level: 6, name: "Master", minXp: 2500, icon: "👑" },
];

export function getLevel(xp: number): typeof XP_LEVELS[number] {
  let current = XP_LEVELS[0];
  for (const l of XP_LEVELS) {
    if (xp >= l.minXp) current = l;
  }
  return current;
}

export function getNextLevel(xp: number): typeof XP_LEVELS[number] | null {
  for (const l of XP_LEVELS) {
    if (xp < l.minXp) return l;
  }
  return null;
}

export function getEarnedBadges(xp: number, completedIds: string[]): Badge[] {
  return BADGES.filter((b) => {
    if (b.xpRequired === 0) return completedIds.length > 0;
    return xp >= b.xpRequired;
  });
}

const STORAGE_KEY = "python_lab_progress";

export type ProgressData = {
  completedChallenges: string[];
  totalXp: number;
  hintUsage: Record<string, number>;
  streakCount: number;
  lastCompletedDate: string;
};

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ProgressData;
  } catch {}
  return { completedChallenges: [], totalXp: 0, hintUsage: {}, streakCount: 0, lastCompletedDate: "" };
}

export function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function completeChallenge(challengeId: string, xpReward: number): ProgressData {
  const data = loadProgress();
  if (data.completedChallenges.includes(challengeId)) return data;

  data.completedChallenges.push(challengeId);
  data.totalXp += xpReward;

  const today = new Date().toISOString().split("T")[0];
  if (data.lastCompletedDate === today) {
    data.streakCount = Math.max(data.streakCount, 1);
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    data.streakCount = data.lastCompletedDate === yesterday ? data.streakCount + 1 : 1;
  }
  data.lastCompletedDate = today;

  saveProgress(data);
  return data;
}
