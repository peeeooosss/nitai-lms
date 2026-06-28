import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/lib/auth.tsx";
import { api } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import Navbar from "../_components/Navbar.tsx";
import { Rocket, Sparkles, GraduationCap, LogIn, UserPlus } from "lucide-react";

const AVATARS = ["🧑‍🚀", "👩‍🔬", "🧑‍💻", "👨‍🏫", "🧑‍🎨", "👩‍🚀", "🧑‍✈️", "👨‍🔬"];

export default function LoginPage() {
  const { user, isLoading, signin, signup, refetchUser } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user?.onboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signup(email, password, name || undefined);
      } else {
        await signin(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnboard = async () => {
    if (!selectedAvatar || !displayName.trim()) return;
    setSubmitting(true);
    try {
      await api.patch("/api/users/onboard", { avatar: selectedAvatar, name: displayName.trim() });
      await refetchUser();
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to save profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Spinner className="size-8" />
        </div>
      </div>
    );
  }

  if (!user) {
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

          <div className="w-full max-w-sm">
            <form onSubmit={handleAuth} className="space-y-4 text-left">
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  minLength={8}
                  maxLength={128}
                />
                {mode === "signup" && (
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li className={password.length >= 8 ? "text-green-500" : ""}>
                      {password.length >= 8 ? "✓" : "•"} At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                      {/[A-Z]/.test(password) ? "✓" : "•"} One uppercase letter
                    </li>
                    <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
                      {/[a-z]/.test(password) ? "✓" : "•"} One lowercase letter
                    </li>
                    <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                      {/[0-9]/.test(password) ? "✓" : "•"} One digit
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>
                      {/[^A-Za-z0-9]/.test(password) ? "✓" : "•"} One special character
                    </li>
                  </ul>
                )}
              </div>
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-medium block mb-1">Name (optional)</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    maxLength={50}
                  />
                </div>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={submitting} className="w-full h-12 text-base rounded-xl">
                {submitting ? <Spinner className="mr-2" /> : mode === "login" ? <LogIn className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">
              {mode === "login" ? (
                <>Don't have an account? <button onClick={() => { setMode("signup"); setError(""); }} className="text-primary underline cursor-pointer">Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => { setMode("login"); setError(""); }} className="text-primary underline cursor-pointer">Sign in</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user.onboarded) {
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
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
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
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                maxLength={30}
              />
            </div>
            <Button
              className="w-full h-12 text-base rounded-xl"
              disabled={!selectedAvatar || !displayName.trim() || submitting}
              onClick={handleOnboard}
            >
              {submitting ? <Spinner className="mr-2" /> : <Rocket className="w-4 h-4 mr-2" />}
              {submitting ? "Entering Mission Control..." : "Enter Mission Control"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
