// Execution engine for the Picto Lab playground

import type { PlacedBlock } from "./blocks.ts";
import { getBlockDef } from "./blocks.ts";

export type SpriteState = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  message: string;
  isJumping: boolean;
  isSpinning: boolean;
};

export const INITIAL_STATE: SpriteState = {
  x: 200,
  y: 200,
  rotation: 0,
  scale: 1,
  color: "#4C97FF",
  message: "",
  isJumping: false,
  isSpinning: false,
};

export const STAGE_WIDTH = 400;
export const STAGE_HEIGHT = 400;

type StepCallback = (state: SpriteState) => void;
type SoundCallback = (sound: string) => void;

export class PictoEngine {
  private state: SpriteState;
  private onStep: StepCallback;
  private onSound: SoundCallback;
  private abortController: AbortController | null = null;

  constructor(onStep: StepCallback, onSound: SoundCallback) {
    this.state = { ...INITIAL_STATE };
    this.onStep = onStep;
    this.onSound = onSound;
  }

  reset() {
    this.stop();
    this.state = { ...INITIAL_STATE };
    this.onStep(this.state);
  }

  stop() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  async run(blocks: PlacedBlock[]) {
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    try {
      await this.executeBlocks(blocks, signal);
    } catch {
      // aborted
    }
  }

  private async executeBlocks(blocks: PlacedBlock[], signal: AbortSignal) {
    let i = 0;
    while (i < blocks.length) {
      if (signal.aborted) throw new Error("aborted");

      const block = blocks[i];
      const def = getBlockDef(block.blockId);
      if (!def) {
        i++;
        continue;
      }

      if (block.blockId === "repeat") {
        const times = (block.params.times as number) || 3;
        const nextBlock = blocks[i + 1];
        if (nextBlock) {
          for (let r = 0; r < times; r++) {
            if (signal.aborted) throw new Error("aborted");
            await this.executeBlock(nextBlock, signal);
            this.onStep({ ...this.state });
            await this.delay(300, signal);
          }
          i += 2;
          continue;
        }
      }

      await this.executeBlock(block, signal);
      this.onStep({ ...this.state });
      await this.delay(300, signal);
      i++;
    }
  }

  private async executeBlock(block: PlacedBlock, signal: AbortSignal) {
    const params = block.params;
    const def = getBlockDef(block.blockId);
    if (!def) return;

    switch (block.blockId) {
      case "move_forward": {
        const steps = (params.steps as number) || 50;
        const rad = (this.state.rotation * Math.PI) / 180;
        this.state.x = this.clampX(this.state.x + Math.cos(rad) * steps);
        this.state.y = this.clampY(this.state.y + Math.sin(rad) * steps);
        break;
      }
      case "move_backward": {
        const steps = (params.steps as number) || 50;
        const rad = (this.state.rotation * Math.PI) / 180;
        this.state.x = this.clampX(this.state.x - Math.cos(rad) * steps);
        this.state.y = this.clampY(this.state.y - Math.sin(rad) * steps);
        break;
      }
      case "turn_right": {
        const deg = (params.degrees as number) || 90;
        this.state.rotation += deg;
        break;
      }
      case "turn_left": {
        const deg = (params.degrees as number) || 90;
        this.state.rotation -= deg;
        break;
      }
      case "jump": {
        this.state.isJumping = true;
        this.onStep({ ...this.state });
        await this.delay(400, signal);
        this.state.isJumping = false;
        break;
      }
      case "say": {
        this.state.message = "Hello! 👋";
        this.onStep({ ...this.state });
        await this.delay(1500, signal);
        this.state.message = "";
        break;
      }
      case "grow": {
        const amount = (params.amount as number) || 20;
        this.state.scale = Math.min(2.5, this.state.scale + amount / 100);
        break;
      }
      case "shrink": {
        const amount = (params.amount as number) || 20;
        this.state.scale = Math.max(0.3, this.state.scale - amount / 100);
        break;
      }
      case "change_color": {
        const colorMap: Record<string, string> = {
          red: "#FF6B6B",
          blue: "#4C97FF",
          green: "#4ECB71",
          purple: "#9966FF",
          orange: "#FFAB19",
        };
        const color = params.color as string;
        this.state.color = colorMap[color] || "#4C97FF";
        break;
      }
      case "spin": {
        this.state.isSpinning = true;
        this.onStep({ ...this.state });
        await this.delay(600, signal);
        this.state.rotation += 360;
        this.state.isSpinning = false;
        break;
      }
      case "repeat": {
        // Repeat does nothing on its own in this simple version
        // It's handled by the block before it (as a concept)
        break;
      }
      case "wait": {
        const seconds = (params.seconds as number) || 1;
        await this.delay(seconds * 1000, signal);
        break;
      }
      case "play_pop":
        this.onSound("pop");
        break;
      case "play_whoosh":
        this.onSound("whoosh");
        break;
      case "play_ding":
        this.onSound("ding");
        break;
    }
  }

  private clampX(x: number): number {
    return Math.max(30, Math.min(STAGE_WIDTH - 30, x));
  }

  private clampY(y: number): number {
    return Math.max(30, Math.min(STAGE_HEIGHT - 30, y));
  }

  private delay(ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, ms);
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new Error("aborted"));
      });
    });
  }
}
