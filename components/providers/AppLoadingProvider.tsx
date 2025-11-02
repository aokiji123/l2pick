"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import { useLanguageStore } from "@/contexts/LanguageContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface AppLoadingContextType {
  isAppReady: boolean;
  registerLoader: (key: string) => void;
  unregisterLoader: (key: string) => void;
}

const AppLoadingContext = createContext<AppLoadingContextType>({
  isAppReady: false,
  registerLoader: () => {},
  unregisterLoader: () => {},
});

export const useAppLoading = () => useContext(AppLoadingContext);

export function AppLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canCheckLoaders, setCanCheckLoaders] = useState(false);
  const [activeLoaders, setActiveLoaders] = useState<Set<string>>(new Set()); // Track all active data loaders
  const [hydratedStates, setHydratedStates] = useState({
    theme: false,
    language: false,
  });

  const { resolvedTheme } = useTheme();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const hasLanguageHydrated = useLanguageStore((state) => state._hasHydrated);

  // Register a loader
  const registerLoader = useCallback((key: string) => {
    setActiveLoaders((prev) => {
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });
  }, []);

  // Unregister a loader
  const unregisterLoader = useCallback((key: string) => {
    setActiveLoaders((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for theme to resolve
  useEffect(() => {
    if (mounted && resolvedTheme !== undefined) {
      setHydratedStates((prev) => ({ ...prev, theme: true }));
    }
  }, [mounted, resolvedTheme]);

  // Use the hydration flag from Zustand's persist middleware
  useEffect(() => {
    if (!mounted) return;

    if (hasLanguageHydrated) {
      setHydratedStates((prev) => ({ ...prev, language: true }));
    }
  }, [mounted, hasLanguageHydrated]);

  // After hydration, wait for components to mount and register their loaders
  useEffect(() => {
    if (hydratedStates.theme && hydratedStates.language) {
      // Give components 100ms to mount and register their loaders
      // This ensures useRegisterLoader hooks have time to execute
      const timer = setTimeout(() => {
        setCanCheckLoaders(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hydratedStates]);

  // Check if we're ready: hydrated + no active loaders
  useEffect(() => {
    if (!canCheckLoaders) return;

    if (activeLoaders.size === 0) {
      // Small delay for smooth transition
      const readyTimer = setTimeout(() => {
        setIsAppReady(true);
      }, 200);

      return () => clearTimeout(readyTimer);
    } else {
      // If loaders are active, set app to not ready (for navigation)
      setIsAppReady(false);
    }
  }, [canCheckLoaders, activeLoaders]);

  // Force ready after maximum wait time
  useEffect(() => {
    const maxWaitTimer = setTimeout(() => {
      setIsAppReady(true);
    }, 5000);

    return () => clearTimeout(maxWaitTimer);
  }, []);

  return (
    <AppLoadingContext.Provider
      value={{ isAppReady, registerLoader, unregisterLoader }}
    >
      <div
        className={isAppReady ? "animate-in fade-in duration-500" : "opacity-0"}
      >
        {children}
      </div>

      {/* Show loading overlay until everything is ready */}
      {!isAppReady && <LoadingSpinner size="lg" fullScreen />}
    </AppLoadingContext.Provider>
  );
}
