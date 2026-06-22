import { useAuth } from "@/lib/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export function SignInButton() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <Button size="sm" className="font-semibold" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Button>
    );
  }

  return (
    <Button size="sm" variant="outline" className="font-semibold" onClick={() => navigate("/login")}>
      Sign In
    </Button>
  );
}
