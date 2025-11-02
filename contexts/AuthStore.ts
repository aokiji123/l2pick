import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/types/user";

export type AuthUser = User;

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: AuthUser) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
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
      setUser: (user) => {
        set({ user });
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
      onRehydrateStorage: () => (state) => {
        // This callback runs after the state is rehydrated from localStorage
        state?.setHasHydrated(true);
      },
    },
  ),
);
