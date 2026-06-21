import { useState, useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Play, RotateCcw, ArrowLeft, Lightbulb, Trophy, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import CodeEditor from "./_components/CodeEditor.tsx";
import OutputPanel from "./_components/OutputPanel.tsx";
import TheoryCard from "./_components/TheoryCard.tsx";
import { runPythonCode, loadPyodideInstance, type RunResult } from "./_lib/runner.ts";
import { CHALLENGES, type PythonChallenge } from "./_lib/challenges.ts";
import { completeChallenge, loadProgress } from "./_lib/badges.ts";
import { fireConfetti } from "@/lib/confetti.ts";

export default function PlaygroundPage() {
  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("challenge");
  const challenge = challengeId
    ? CHALLENGES.find((c) => c.id === challengeId) ?? null
    : null;

  const [code, setCode] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  const [progress, setProgress] = useState(() => loadProgress());

  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode);
      setResult(null);
      setHasCompleted(false);
      setShowHint(false);
      setHintIndex(0);
      setXpEarned(0);
    }
  }, [challenge]);

  useEffect(() => {
    loadPyodideInstance()
      .then(() => setIsPyodideLoading(false))
      .catch(() => setIsPyodideLoading(false));
  }, []);

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);

    const runResult = await runPythonCode(code);
    setResult(runResult);

    if (runResult.success && challenge && !hasCompleted) {
      const alreadyDone = progress.completedChallenges.includes(challenge.id);
      if (!alreadyDone) {
        const updated = completeChallenge(challenge.id, challenge.xpReward);
        setProgress(updated);
        setXpEarned(challenge.xpReward);
        setHasCompleted(true);
        fireConfetti({ count: 100, spread: 160 });
      }
    }

    setIsRunning(false);
  }, [code, challenge, hasCompleted, progress.completedChallenges]);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  const handleResetCode = useCallback(() => {
    if (challenge) {
      setCode(challenge.starterCode);
    } else {
      setCode("");
    }
    setResult(null);
  }, [challenge]);

  const nextHint = () => {
    if (challenge && hintIndex < challenge.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
    setShowHint(true);
  };

  const alreadyCompleted = challenge ? progress.completedChallenges.includes(challenge.id) : false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <Link
            to={challenge ? "/products/python-lab/challenges" : "/products/python-lab"}
            className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">🐍</span>
            <h1 className="font-display text-lg font-bold tracking-wide text-foreground">
              PYTHON LAB
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
          {isPyodideLoading && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading Python...
            </div>
          )}
          {challenge && (
            <>
              <Button
                onClick={nextHint}
                variant="ghost"
                size="sm"
                className="cursor-pointer gap-1.5 text-amber-600"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Hint</span>
              </Button>
              <div className="flex items-center gap-1 text-xs text-muted-foreground px-2">
                <Zap className="w-3 h-3 text-amber-500" />
                {challenge.xpReward} XP
              </div>
            </>
          )}
          <Button
            onClick={handleRun}
            disabled={isRunning || !code.trim() || isPyodideLoading}
            className="cursor-pointer gap-2 bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            size="sm"
            className="cursor-pointer gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Output
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
            Amazing! You earned <span className="font-bold">{xpEarned} XP</span>! 🎉
          </p>
          <Link to="/products/python-lab/challenges">
            <Button size="sm" variant="ghost" className="cursor-pointer text-green-700 dark:text-green-400 text-xs">
              More Challenges
            </Button>
          </Link>
        </div>
      )}

      {/* Already completed banner */}
      {alreadyCompleted && !hasCompleted && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4 text-blue-500" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            You already completed this challenge! Try it again or pick a new one.
          </p>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel: theory + editor */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          {/* Theory card */}
          {challenge && challenge.theory && (
            <TheoryCard title={challenge.theoryTitle} content={challenge.theory} />
          )}

          {/* Code editor */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Editor
              </label>
              <Button
                onClick={handleResetCode}
                variant="ghost"
                size="sm"
                className="cursor-pointer text-xs text-muted-foreground"
              >
                Reset Code
              </Button>
            </div>
            <div className="flex-1">
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholderText="# Write your Python code here..."
                minHeight="100%"
              />
            </div>
          </div>
        </div>

        {/* Right panel: output */}
        <div className="w-full lg:w-[440px] p-4 flex-shrink-0">
          <OutputPanel result={result} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}
