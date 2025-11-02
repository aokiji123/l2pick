import { useEffect } from "react";
import { useAppLoading } from "@/components/providers/AppLoadingProvider";

export function useRegisterLoader(
  isLoading: boolean,
  key: string,
  options?: {
    enabled?: boolean; // Whether this loader should be tracked (default: true)
  },
) {
  const { registerLoader, unregisterLoader } = useAppLoading();
  const enabled = options?.enabled !== false;

  useEffect(() => {
    if (!enabled) return;

    if (isLoading) {
      registerLoader(key);
    } else {
      unregisterLoader(key);
    }

    // Cleanup on unmount
    return () => {
      unregisterLoader(key);
    };
  }, [isLoading, key, enabled, registerLoader, unregisterLoader]);
}
