import { useNavigate } from "react-router-dom";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "../_components/Navbar.tsx";
import { Rocket, Sparkles, GraduationCap, Atom } from "lucide-react";
import { useEffect, useState } from "react";

const AVATARS = ["🧑‍🚀", "👩‍🔬", "🧑‍💻", "👨‍🏫", "🧑‍🎨", "👩‍🚀", "🧑‍✈️", "👨‍🔬"];

export default function LoginPage() {
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const user = useQuery(api.users.getCurrentUser);
  const onboardUser = useMutation(api.users.onboardUser);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.onboarded) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user?.onboarded, navigate]);

  const handleOnboard = async () => {
    if (!selectedAvatar || !displayName.trim()) return;
    setOnboarding(true);
    await onboardUser({ avatar: selectedAvatar, name: displayName.trim() });
    navigate("/dashboard", { replace: true });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
              <Rocket className="w-12 h-12 text-primary" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NITAI Mission Control
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-8">
            Sign in to begin your learning mission. Explore AI, Robotics, Coding, and more across 19+ labs.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["🧑‍🚀", "👩‍🔬", "🤖", "🚀", "💻", "🔬"].map((emoji, i) => (
              <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{emoji}</span>
            ))}
          </div>
          <SignInButton
            signInText="Begin Your Mission"
            className="text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-primary/20"
          />
          <p className="text-xs text-muted-foreground mt-4">Free trial — no credit card required</p>
        </div>
      </div>
    );
  }

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!user?.onboarded) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <GraduationCap className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="font-display font-bold text-2xl">Welcome, Cadet!</h2>
              <p className="text-muted-foreground mt-1">Choose your avatar and call sign to enter Mission Control.</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Pick your avatar</label>
              <div className="grid grid-cols-4 gap-3">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAvatar(a)}
                    className={`text-3xl p-3 rounded-xl border-2 transition-all ${
                      selectedAvatar === a
                        ? "border-primary bg-primary/10 scale-110 shadow-lg"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your call sign</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. AstroLearner"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={30}
              />
            </div>

            <Button
              className="w-full h-12 text-base rounded-xl"
              disabled={!selectedAvatar || !displayName.trim() || onboarding}
              onClick={handleOnboard}
            >
              {onboarding ? <Spinner className="mr-2" /> : <Rocket className="w-4 h-4 mr-2" />}
              {onboarding ? "Entering Mission Control..." : "Enter Mission Control"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
