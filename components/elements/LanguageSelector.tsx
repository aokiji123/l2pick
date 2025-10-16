'use client';

import React from 'react';
import { useLanguageStore } from '../../contexts/LanguageContext';

type Language = 'EN' | 'RU';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const languages: Language[] = ['EN', 'RU'];

  return (
    <div className="flex items-center">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`
            rounded-sm h-6 w-8 font-bold text-sm transition-all duration-300
            ${currentLanguage === lang 
              ? 'bg-brand-btn text-white' 
              : 'bg-brand-btn-gray text-white'
            }
          `}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
