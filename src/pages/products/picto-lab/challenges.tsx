import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Star, Trophy, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import { CHALLENGES, FREE_CHALLENGE_LIMIT, type Challenge } from "./_lib/challenges.ts";

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const DIFFICULTY_STARS = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function ChallengesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedFree, setCompletedFree] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("picto_completed_challenges");
      return stored ? JSON.parse(stored) as string[] : [];
    } catch {
      return [];
    }
  });

  const freeTrialsUsed = completedFree.length;
  const hasExhaustedFreeTrial = freeTrialsUsed >= FREE_CHALLENGE_LIMIT;

  const handleStartChallenge = (challenge: Challenge) => {
    // Free challenges: always playable
    if (challenge.isFree) {
      navigate(`/products/picto-lab/playground?challenge=${challenge.id}`);
      return;
    }

    // Paid challenge but still have free trial credits
    if (!hasExhaustedFreeTrial) {
      navigate(`/products/picto-lab/playground?challenge=${challenge.id}`);
      return;
    }

    // Exhausted free trial — need subscription
    if (!user) {
      return; // SignInButton will be shown
    }
    navigate("/products/picto-lab/subscribe");
  };

  const markChallengeCompleted = (challengeId: string) => {
    if (!completedFree.includes(challengeId)) {
      const updated = [...completedFree, challengeId];
      setCompletedFree(updated);
      localStorage.setItem("picto_completed_challenges", JSON.stringify(updated));
    }
  };

  // Keep markChallengeCompleted accessible for debugging (unused but may be useful later)
  void markChallengeCompleted;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/products/picto-lab"
              className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <h1 className="font-display text-lg font-bold tracking-wide">PICTO LAB</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user && <SignInButton />}
            {user && (
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  {completedFree.length} completed
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
              Challenges & Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-4">
              Pick a challenge, build your code, and watch the cat come alive!
            </p>

            {/* Free trial info */}
            {!hasExhaustedFreeTrial && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <Lightbulb className="w-4 h-4" />
                Free trial: {FREE_CHALLENGE_LIMIT - freeTrialsUsed} challenge{FREE_CHALLENGE_LIMIT - freeTrialsUsed !== 1 ? "s" : ""} remaining
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

      {/* Challenges grid */}
      <section className="py-8 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHALLENGES.map((challenge, i) => {
              const isLocked = !challenge.isFree && hasExhaustedFreeTrial;
              const isCompleted = completedFree.includes(challenge.id);

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative bg-card border rounded-2xl p-6 flex flex-col transition-all hover:shadow-lg ${
                    isLocked ? "opacity-75" : "hover:border-primary/30"
                  } ${isCompleted ? "border-green-300 dark:border-green-700" : "border-border"}`}
                >
                  {/* Lock badge */}
                  {isLocked && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}

                  {/* Completed badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  )}

                  <span className="text-3xl mb-3">{challenge.icon}</span>
                  <h3 className="font-bold text-foreground text-lg mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[challenge.difficulty]}`}
                      >
                        {challenge.difficulty}
                      </span>
                      <div className="flex">
                        {Array.from({ length: DIFFICULTY_STARS[challenge.difficulty] }).map((_, si) => (
                          <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{challenge.category}</span>
                  </div>

                  <div className="mt-4">
                    {isLocked && !user ? (
                      <SignInButton />
                    ) : isLocked ? (
                      <Button
                        onClick={() => navigate("/products/picto-lab/subscribe")}
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <p className="text-3xl mb-3">🚀</p>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Ready for more?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Subscribe to unlock all challenges, advanced projects, and track your learning progress!
              </p>
              <Link to="/products/picto-lab/subscribe">
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
