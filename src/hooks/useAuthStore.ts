import { AuthUserResponseType } from "@/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUserResponseType | null;
  accessToken: string | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (user: AuthUserResponseType | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        set({ isAuthenticated: false, user: null, accessToken: null });
      },
    }),
    {
      name: "auth-storage",
      // Only persist these 3 fields — user object is included so name survives refresh
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        user: s.user,
        accessToken: s.accessToken,
      }),
    }
  )
);
