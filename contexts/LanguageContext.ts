import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translations, type Language } from "@/lib/translations";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: "RU", // Default language
      setLanguage: (language: Language) => {
        set({ currentLanguage: language });
      },
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        // This callback runs after the state is rehydrated from localStorage
        state?.setHasHydrated(true);
      },
    },
  ),
);

// Hook for easy translation usage
export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore();

  const t = (key: keyof typeof translations.RU) => {
    return translations[currentLanguage][key] || translations.RU[key] || key;
  };

  return { t, currentLanguage };
};
