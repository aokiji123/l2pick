'use client';

import React from 'react';
import { LuUserRound } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/contexts/LanguageContext';

export default function LoginButton() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <button
      onClick={() => router.push('/auth')}
      className="flex items-center justify-center gap-3.5 cursor-pointer rounded-[20px] h-[51px] px-5 text-white font-bold bg-[linear-gradient(160deg,#b8573c,#ac543c,#874c3e,#594140,#4f3f40)] hover:opacity-95 transition"
    >
      <LuUserRound className="w-5 h-5" />
      <span>{t('login')}</span>
    </button>
  );
}
