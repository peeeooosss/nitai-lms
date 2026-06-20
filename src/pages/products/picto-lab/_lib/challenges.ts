import type { PlacedBlock } from "./blocks.ts";

export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  icon: string;
  category: string;
  starterBlocks: PlacedBlock[];
  hints: string[];
  isFree: boolean; // true = available in free trial
};

export const CHALLENGES: Challenge[] = [
  {
    id: "cat-dance",
    title: "Make the Cat Dance!",
    description: "Make the cat spin, jump, and change colors to create a fun dance routine!",
    difficulty: "easy",
    icon: "💃",
    category: "Animation",
    isFree: true,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "spin", params: {} },
      { instanceId: "starter-2", blockId: "change_color", params: { color: "purple" } },
      { instanceId: "starter-3", blockId: "jump", params: { height: 60 } },
      { instanceId: "starter-4", blockId: "play_ding", params: {} },
    ],
    hints: [
      "Try adding more spin blocks to make the cat twirl!",
      "Use different colors to make the dance colorful",
      "Add sound blocks between moves for rhythm",
    ],
  },
  {
    id: "explore-world",
    title: "Explore the World",
    description: "Move the cat around the stage visiting all four corners. Can you make it go in a big square?",
    difficulty: "easy",
    icon: "🗺️",
    category: "Motion",
    isFree: true,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "move_forward", params: { steps: 100 } },
      { instanceId: "starter-2", blockId: "turn_right", params: { degrees: 90 } },
    ],
    hints: [
      "A square has 4 sides — move forward then turn right, four times!",
      "Try changing the step count to make a bigger or smaller square",
      "Add a 'Say Hello' at each corner!",
    ],
  },
  {
    id: "grow-shrink",
    title: "Magic Size Spell",
    description: "Cast a spell that makes the cat grow HUGE and then shrink back to tiny!",
    difficulty: "easy",
    icon: "🪄",
    category: "Looks",
    isFree: false,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "say", params: {} },
      { instanceId: "starter-2", blockId: "grow", params: { amount: 30 } },
      { instanceId: "starter-3", blockId: "grow", params: { amount: 30 } },
      { instanceId: "starter-4", blockId: "play_whoosh", params: {} },
    ],
    hints: [
      "Use multiple grow blocks to make the cat really big!",
      "Then use shrink blocks to bring it back to normal",
      "Add a 'Wait' between growing and shrinking for drama",
    ],
  },
  {
    id: "zigzag",
    title: "Zigzag Runner",
    description: "Program the cat to run in a zigzag pattern across the stage!",
    difficulty: "medium",
    icon: "⚡",
    category: "Motion",
    isFree: false,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "move_forward", params: { steps: 50 } },
      { instanceId: "starter-2", blockId: "turn_right", params: { degrees: 45 } },
      { instanceId: "starter-3", blockId: "move_forward", params: { steps: 50 } },
      { instanceId: "starter-4", blockId: "turn_left", params: { degrees: 90 } },
    ],
    hints: [
      "A zigzag alternates between turning right and turning left",
      "Use smaller steps for a tighter zigzag pattern",
      "Try turning 45 degrees each time for a nice angle",
    ],
  },
  {
    id: "music-show",
    title: "Sound & Light Show",
    description: "Create an amazing performance with sounds, colors, and movement!",
    difficulty: "medium",
    icon: "🎪",
    category: "Creative",
    isFree: false,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "play_ding", params: {} },
      { instanceId: "starter-2", blockId: "change_color", params: { color: "red" } },
      { instanceId: "starter-3", blockId: "spin", params: {} },
      { instanceId: "starter-4", blockId: "play_pop", params: {} },
      { instanceId: "starter-5", blockId: "change_color", params: { color: "blue" } },
      { instanceId: "starter-6", blockId: "jump", params: { height: 60 } },
    ],
    hints: [
      "Pair each sound with a different color for a light show effect!",
      "Add 'Wait' blocks between actions for better timing",
      "End with a big spin and the 'Ding!' sound for a grand finale",
    ],
  },
  {
    id: "obstacle-course",
    title: "Obstacle Course",
    description: "Navigate through an imaginary obstacle course — move, jump, duck (shrink), and celebrate!",
    difficulty: "hard",
    icon: "🏃",
    category: "Adventure",
    isFree: false,
    starterBlocks: [
      { instanceId: "starter-1", blockId: "move_forward", params: { steps: 80 } },
      { instanceId: "starter-2", blockId: "jump", params: { height: 60 } },
      { instanceId: "starter-3", blockId: "move_forward", params: { steps: 60 } },
      { instanceId: "starter-4", blockId: "shrink", params: { amount: 30 } },
    ],
    hints: [
      "Jump over obstacles with the Jump block",
      "Shrink to duck under low barriers, then grow back!",
      "Celebrate at the end with a spin and 'Say Hello'",
    ],
  },
];

export const FREE_CHALLENGE_IDS = CHALLENGES.filter((c) => c.isFree).map((c) => c.id);
export const FREE_CHALLENGE_LIMIT = 2;
