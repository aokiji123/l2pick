import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/types/user";

export type AuthUser = User;

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        get().setToken(token);
      },
      logout: () => {
        // Clear token from storage
        localStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-token");
        set({ user: null, token: null, isAuthenticated: false });
      },
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: "auth-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist token in zustand, we'll handle it separately
      }),
    }
  )
);
