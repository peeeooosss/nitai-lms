import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import Navbar from "../../_components/Navbar.tsx";
import Footer from "../../_components/Footer.tsx";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    period: "/month",
    icon: <Star className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Up to 30 students",
      "All Python challenges",
      "In-browser coding environment",
      "Basic progress tracking",
      "Email support",
      "1 teacher account",
    ],
  },
  {
    id: "school",
    name: "School",
    price: "₹2,499",
    period: "/month",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Up to 150 students",
      "All Python challenges & projects",
      "Advanced analytics",
      "Priority support",
      "5 teacher accounts",
      "Robot integration",
      "Parent reports",
      "Custom branding",
    ],
  },
  {
    id: "campus",
    name: "Campus",
    price: "Custom",
    period: "",
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    features: [
      "Unlimited students",
      "All modules & labs (Python + Picto)",
      "Dedicated success manager",
      "API access",
      "Multi-campus management",
      "SLA guarantee",
      "White-label option",
      "On-site training",
    ],
  },
];

export default function SubscribePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (!user) return;
    navigate(`/products/python-lab/subscribe?plan=${planId}&status=pending`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            to="/products/python-lab"
            className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Python Lab
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              🐍 NITAI Python Lab
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Unlock Full Access
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Give your students unlimited access to all Python challenges, projects, and learning tools.
            </p>
          </motion.div>

          {!user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto mb-12 p-6 bg-card border rounded-2xl text-center"
            >
              <p className="text-2xl mb-2">👋</p>
              <h3 className="font-bold text-lg text-foreground mb-2">Sign in first!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create an account or sign in to choose a plan and get started.
              </p>
              <SignInButton />
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-card border rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10 scale-105"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-primary px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-4`}
                >
                  {plan.icon}
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={!user}
                  className={`cursor-pointer w-full ${plan.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground max-w-lg mx-auto">
            <p>All plans include a 14-day free trial. Cancel anytime. No hidden fees.</p>
            <p className="mt-2">Need help choosing? Contact us at <span className="text-primary font-medium">hello@nitai.edu</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
