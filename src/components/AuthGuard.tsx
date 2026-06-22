import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner.tsx";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="size-8" />
        </div>
      </AuthLoading>
      <Unauthenticated>
        <Navigate to="/login" replace />
      </Unauthenticated>
      <Authenticated>
        {children}
      </Authenticated>
    </>
  );
}
