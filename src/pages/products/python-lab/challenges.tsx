import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Star, Trophy, Lightbulb, Zap, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import { CHALLENGES, MODULES, FREE_CHALLENGE_LIMIT, type PythonChallenge } from "./_lib/challenges.ts";
import { loadProgress, getLevel } from "./_lib/badges.ts";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  easy: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const DIFFICULTY_STARS: Record<string, number> = {
  beginner: 1,
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function ChallengesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const progress = useMemo(() => loadProgress(), []);
  const level = getLevel(progress.totalXp);
  const freeTrialsUsed = progress.completedChallenges.filter(
    (id) => !CHALLENGES.find((c) => c.id === id)?.isFree
  ).length;
  const hasExhaustedFreeTrial = freeTrialsUsed >= FREE_CHALLENGE_LIMIT;
  const totalChallenges = CHALLENGES.length;
  const completedCount = progress.completedChallenges.length;

  const modulesWithProgress = useMemo(
    () =>
      MODULES.map((m) => {
        const challenges = CHALLENGES.filter((c) => c.moduleId === m.id).sort(
          (a, b) => a.order - b.order
        );
        const completed = challenges.filter((c) =>
          progress.completedChallenges.includes(c.id)
        ).length;
        return { ...m, challenges, completed, total: challenges.length };
      }),
    [progress.completedChallenges]
  );

  const filteredChallenges = useMemo(() => {
    if (!activeModule) return CHALLENGES;
    return CHALLENGES.filter((c) => c.moduleId === activeModule);
  }, [activeModule]);

  const handleStartChallenge = (challenge: PythonChallenge) => {
    if (challenge.isFree) {
      navigate(`/products/python-lab/playground?challenge=${challenge.id}`);
      return;
    }
    if (!hasExhaustedFreeTrial) {
      navigate(`/products/python-lab/playground?challenge=${challenge.id}`);
      return;
    }
    if (!user) return;
    navigate("/products/python-lab/subscribe");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/products/python-lab"
              className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐍</span>
              <h1 className="font-display text-lg font-bold tracking-wide">PYTHON LAB</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* XP / Level */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-lg">{level.icon}</span>
              <span className="font-medium text-foreground">{level.name}</span>
              <span className="text-muted-foreground">{progress.totalXp} XP</span>
            </div>
            {!user && <SignInButton />}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
              Python Challenges
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-4">
              Learn Python by coding! Each challenge teaches a new concept.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {completedCount}/{totalChallenges} done
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-amber-500" />
                {progress.totalXp} XP earned
              </div>
            </div>

            {/* Free trial info */}
            {!hasExhaustedFreeTrial && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <Lightbulb className="w-4 h-4" />
                Free trial: {Math.max(0, FREE_CHALLENGE_LIMIT - freeTrialsUsed)} challenge
                {FREE_CHALLENGE_LIMIT - freeTrialsUsed !== 1 ? "s" : ""} remaining
              </div>
            )}
            {hasExhaustedFreeTrial && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
                <Lock className="w-4 h-4" />
                Free trial complete! Subscribe for unlimited access
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Module tabs */}
      <section className="py-4 border-b">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            <button
              onClick={() => setActiveModule(null)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                !activeModule
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Modules
            </button>
            {modulesWithProgress.map((m) => {
              const isActive = activeModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.name}</span>
                  {m.completed > 0 && (
                    <span className="text-xs opacity-70">
                      ({m.completed}/{m.total})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenges grid */}
      <section className="py-8 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {activeModule && (
            <div className="mb-6">
              {modulesWithProgress
                .filter((m) => m.id === activeModule)
                .map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-lg`}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{m.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {m.completed}/{m.total} challenges completed
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChallenges.map((challenge, i) => {
              const isLocked = !challenge.isFree && hasExhaustedFreeTrial;
              const isCompleted = progress.completedChallenges.includes(challenge.id);

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`relative bg-card border rounded-2xl p-6 flex flex-col transition-all hover:shadow-lg ${
                    isLocked ? "opacity-75" : "hover:border-primary/30"
                  } ${isCompleted ? "border-green-300 dark:border-green-700" : "border-border"}`}
                >
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    {isLocked && (
                      <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="w-7 h-7 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <Trophy className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{challenge.icon}</span>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${DIFFICULTY_COLORS[challenge.difficulty]}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-1 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        {challenge.xpReward} XP
                      </span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: DIFFICULTY_STARS[challenge.difficulty] }).map(
                        (_, si) => (
                          <Star
                            key={si}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {challenge.moduleName}
                    </span>
                  </div>

                  <div className="mt-4">
                    {isLocked && !user ? (
                      <SignInButton />
                    ) : isLocked ? (
                      <Button
                        onClick={() => navigate("/products/python-lab/subscribe")}
                        className="cursor-pointer w-full gap-2"
                        size="sm"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Unlock with Subscription
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleStartChallenge(challenge)}
                        className="cursor-pointer w-full gap-2 bg-green-500 hover:bg-green-600 text-white"
                        size="sm"
                      >
                        {isCompleted ? "Play Again" : "Start Challenge"}
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      {hasExhaustedFreeTrial && (
        <section className="py-12 bg-gradient-to-t from-primary/5 to-transparent">
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl mb-3">🚀</p>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Ready for more?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Subscribe to unlock all challenges, advanced projects, and track your learning
                progress!
              </p>
              <Link to="/products/python-lab/subscribe">
                <Button size="lg" className="cursor-pointer gap-2 font-semibold">
                  View Plans & Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
