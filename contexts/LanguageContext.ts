import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, type Language } from '@/lib/translations';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'RU', // Default language
      setLanguage: (language: Language) => {
        set({ currentLanguage: language });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// Hook for easy translation usage
export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore();
  
  const t = (key: keyof typeof translations.RU) => {
    return translations[currentLanguage][key] || translations.RU[key] || key;
  };
  
  return { t, currentLanguage };
};
