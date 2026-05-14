"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Wait for Zustand persist to rehydrate from localStorage
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    // Only redirect after hydration is complete
    if (hasHydrated && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Show loading while hydrating
  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading if not authenticated after hydration
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
