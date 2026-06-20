import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Construction } from "lucide-react";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild className="font-semibold">
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="ghost" asChild className="font-semibold border border-border">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
