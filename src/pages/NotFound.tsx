import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Home } from "lucide-react";
import Mascot from "./_components/Mascot.tsx";
import { fireConfetti } from "@/lib/confetti.ts";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Mascot size={120} color="#3B82F6" onClick={() => fireConfetti({ count: 60 })} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-8xl font-display font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Meow... Page Not Found!
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-md mx-auto"
        >
          Looks like this page wandered off somewhere. 
          Let&apos;s get you back on track!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button asChild size="lg" className="gap-2 font-semibold">
            <Link to="/"><Home className="w-4 h-4" /> Go Home</Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="gap-2 font-semibold"
            asChild
          >
            <Link to="/contact"><ArrowLeft className="w-4 h-4" /> Contact Us</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
