import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Play, RotateCcw, Trash2, ArrowLeft, Lightbulb, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import BlockPalette from "./_components/BlockPalette.tsx";
import Workspace from "./_components/Workspace.tsx";
import Stage from "./_components/Stage.tsx";
import { type PlacedBlock, type BlockDefinition, getBlockDef } from "./_lib/blocks.ts";
import { PictoEngine, INITIAL_STATE, type SpriteState } from "./_lib/engine.ts";
import { CHALLENGES } from "./_lib/challenges.ts";
import { fireConfetti } from "@/lib/confetti.ts";

export default function PlaygroundPage() {
  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("challenge");
  const challenge = challengeId ? CHALLENGES.find((c) => c.id === challengeId) : null;

  const [blocks, setBlocks] = useState<PlacedBlock[]>(() => {
    if (challenge) return [...challenge.starterBlocks];
    return [];
  });
  const [sprite, setSprite] = useState<SpriteState>({ ...INITIAL_STATE });
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const engineRef = useRef<PictoEngine | null>(null);

  // Load challenge blocks when challenge changes
  useEffect(() => {
    if (challenge) {
      setBlocks([...challenge.starterBlocks]);
      setHasCompleted(false);
      setShowHint(false);
      setHintIndex(0);
    }
  }, [challenge]);

  const handleBlockDragStart = useCallback((_block: BlockDefinition) => {
    // Visual feedback could be added here
  }, []);

  const handleDrop = useCallback((blockId: string) => {
    const def = getBlockDef(blockId);
    if (!def) return;

    const params: Record<string, number | string> = {};
    if (def.params) {
      for (const p of def.params) {
        params[p.name] = p.default;
      }
    }

    const newBlock: PlacedBlock = {
      instanceId: `${blockId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      blockId,
      params,
    };

    setBlocks((prev) => [...prev, newBlock]);
  }, []);

  const handleRemove = useCallback((instanceId: string) => {
    setBlocks((prev) => prev.filter((b) => b.instanceId !== instanceId));
  }, []);

  const handleParamChange = useCallback((instanceId: string, paramName: string, value: number | string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.instanceId === instanceId
          ? { ...b, params: { ...b.params, [paramName]: value } }
          : b
      )
    );
  }, []);

  const handleRun = useCallback(async () => {
    if (blocks.length === 0) return;

    setIsRunning(true);
    setSprite({ ...INITIAL_STATE });

    const engine = new PictoEngine(
      (state) => setSprite({ ...state }),
      (sound) => playSound(sound)
    );
    engineRef.current = engine;

    await engine.run(blocks);
    setIsRunning(false);

    // Mark challenge as completed if running a challenge
    if (challenge && !hasCompleted) {
      setHasCompleted(true);
      fireConfetti({ count: 100, spread: 160 });
      // Persist to localStorage
      try {
        const stored = localStorage.getItem("picto_completed_challenges");
        const completed: string[] = stored ? JSON.parse(stored) as string[] : [];
        if (!completed.includes(challenge.id)) {
          completed.push(challenge.id);
          localStorage.setItem("picto_completed_challenges", JSON.stringify(completed));
        }
      } catch {
        // ignore storage errors
      }
    }
  }, [blocks, challenge, hasCompleted]);

  const handleReset = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.reset();
    }
    setSprite({ ...INITIAL_STATE });
    setIsRunning(false);
  }, []);

  const handleClear = useCallback(() => {
    handleReset();
    setBlocks(challenge ? [...challenge.starterBlocks] : []);
  }, [handleReset, challenge]);

  const nextHint = () => {
    if (challenge && hintIndex < challenge.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
    setShowHint(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <Link
            to={challenge ? "/products/picto-lab/challenges" : "/products/picto-lab"}
            className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h1 className="font-display text-lg font-bold tracking-wide text-foreground">
              PICTO LAB
            </h1>
          </div>
          {challenge && (
            <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 bg-muted rounded-lg">
              <span>{challenge.icon}</span>
              <span className="text-sm font-medium text-foreground">{challenge.title}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {challenge && (
            <Button
              onClick={nextHint}
              variant="ghost"
              size="sm"
              className="cursor-pointer gap-1.5 text-amber-600"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Hint</span>
            </Button>
          )}
          <Button
            onClick={handleRun}
            disabled={isRunning || blocks.length === 0}
            className="cursor-pointer gap-2 bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            <Play className="w-4 h-4" />
            Run
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            size="sm"
            className="cursor-pointer gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="cursor-pointer gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </header>

      {/* Challenge hint banner */}
      {challenge && showHint && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 flex items-center gap-3">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300 flex-1">
            {challenge.hints[hintIndex]}
          </p>
          <button
            onClick={() => setShowHint(false)}
            className="cursor-pointer text-amber-600 hover:text-amber-800 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Completion celebration */}
      {hasCompleted && (
        <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 flex items-center justify-center gap-3">
          <Trophy className="w-5 h-5 text-green-600" />
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            Amazing! You completed &quot;{challenge?.title}&quot;!
          </p>
          <Link to="/products/picto-lab/challenges">
            <Button size="sm" variant="ghost" className="cursor-pointer text-green-700 dark:text-green-400 text-xs">
              More Challenges
            </Button>
          </Link>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Block palette */}
        <div className="w-full md:w-56 lg:w-64 p-3 flex-shrink-0 md:h-full h-48 md:overflow-visible overflow-hidden">
          <BlockPalette onBlockDragStart={handleBlockDragStart} />
        </div>

        {/* Workspace */}
        <div className="flex-1 p-3 min-w-0">
          <Workspace
            blocks={blocks}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onParamChange={handleParamChange}
            isRunning={isRunning}
          />
        </div>

        {/* Stage */}
        <div className="w-full md:w-[440px] lg:w-[460px] p-3 flex-shrink-0">
          <Stage sprite={sprite} />
        </div>
      </div>
    </div>
  );
}

// Simple Web Audio API sound effects
function playSound(type: string) {
  try {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case "pop":
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case "whoosh":
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case "ding":
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
    }
  } catch {
    // Audio not available
  }
}
