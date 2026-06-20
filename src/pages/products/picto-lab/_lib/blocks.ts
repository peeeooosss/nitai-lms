// Block definitions for NITAI Picto Lab

export type BlockCategory = "motion" | "looks" | "control" | "sound";

export type BlockDefinition = {
  id: string;
  category: BlockCategory;
  label: string;
  icon: string;
  color: string;
  params?: { name: string; type: "number" | "select"; default: number | string; options?: string[] }[];
};

export type PlacedBlock = {
  instanceId: string;
  blockId: string;
  params: Record<string, number | string>;
};

export const BLOCK_CATEGORIES: { id: BlockCategory; label: string; color: string; icon: string }[] = [
  { id: "motion", label: "Motion", color: "#4C97FF", icon: "🚀" },
  { id: "looks", label: "Looks", color: "#9966FF", icon: "✨" },
  { id: "control", label: "Control", color: "#FFAB19", icon: "🔁" },
  { id: "sound", label: "Sound", color: "#CF63CF", icon: "🔊" },
];

export const BLOCKS: BlockDefinition[] = [
  // Motion
  {
    id: "move_forward",
    category: "motion",
    label: "Move Forward",
    icon: "➡️",
    color: "#4C97FF",
    params: [{ name: "steps", type: "number", default: 50 }],
  },
  {
    id: "move_backward",
    category: "motion",
    label: "Move Back",
    icon: "⬅️",
    color: "#4C97FF",
    params: [{ name: "steps", type: "number", default: 50 }],
  },
  {
    id: "turn_right",
    category: "motion",
    label: "Turn Right",
    icon: "↩️",
    color: "#4C97FF",
    params: [{ name: "degrees", type: "number", default: 90 }],
  },
  {
    id: "turn_left",
    category: "motion",
    label: "Turn Left",
    icon: "↪️",
    color: "#4C97FF",
    params: [{ name: "degrees", type: "number", default: 90 }],
  },
  {
    id: "jump",
    category: "motion",
    label: "Jump",
    icon: "⬆️",
    color: "#4C97FF",
    params: [{ name: "height", type: "number", default: 60 }],
  },

  // Looks
  {
    id: "say",
    category: "looks",
    label: "Say Hello",
    icon: "💬",
    color: "#9966FF",
  },
  {
    id: "grow",
    category: "looks",
    label: "Grow",
    icon: "🔍",
    color: "#9966FF",
    params: [{ name: "amount", type: "number", default: 20 }],
  },
  {
    id: "shrink",
    category: "looks",
    label: "Shrink",
    icon: "🔎",
    color: "#9966FF",
    params: [{ name: "amount", type: "number", default: 20 }],
  },
  {
    id: "change_color",
    category: "looks",
    label: "Change Color",
    icon: "🎨",
    color: "#9966FF",
    params: [{ name: "color", type: "select", default: "red", options: ["red", "blue", "green", "purple", "orange"] }],
  },
  {
    id: "spin",
    category: "looks",
    label: "Spin",
    icon: "💫",
    color: "#9966FF",
  },

  // Control
  {
    id: "repeat",
    category: "control",
    label: "Repeat",
    icon: "🔁",
    color: "#FFAB19",
    params: [{ name: "times", type: "number", default: 3 }],
  },
  {
    id: "wait",
    category: "control",
    label: "Wait",
    icon: "⏱️",
    color: "#FFAB19",
    params: [{ name: "seconds", type: "number", default: 1 }],
  },

  // Sound
  {
    id: "play_pop",
    category: "sound",
    label: "Pop!",
    icon: "🎵",
    color: "#CF63CF",
  },
  {
    id: "play_whoosh",
    category: "sound",
    label: "Whoosh!",
    icon: "💨",
    color: "#CF63CF",
  },
  {
    id: "play_ding",
    category: "sound",
    label: "Ding!",
    icon: "🔔",
    color: "#CF63CF",
  },
];

export function getBlockDef(blockId: string): BlockDefinition | undefined {
  return BLOCKS.find((b) => b.id === blockId);
}
