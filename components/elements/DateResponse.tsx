"use client";

import React from 'react';
import { isToday, isTomorrow, isYesterday, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTranslation } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
  date: string;
  color?: boolean;
  topserver?: boolean;
}

function getRelativeDateLabel(
  dateString: string,
  t: (key: keyof typeof translations.RU) => string
): string | null {
  const date = new Date(dateString);
  if (isToday(date)) return t("date_today");
  if (isTomorrow(date)) return t("date_tomorrow");
  if (isYesterday(date)) return t("date_yesterday");
  return null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'dd.MM.yy', { locale: ru });
}

const DateResponse: React.FC<Props> = ({ date, color = false, topserver = false }) => {
  const { t } = useTranslation();
  const relativeLabel = getRelativeDateLabel(date, t);

  if (relativeLabel) {
    let bgColor = "";
    if (relativeLabel === t("date_today")) {
      bgColor = topserver ? "text-white" : "text-brand-green";
    } else if (relativeLabel === t("date_tomorrow")) {
      bgColor = topserver ? "text-white" : "text-brand-btn";
    }

    return (
      <span className={`${bgColor} ${color ? '' : '!bg-transparent'} dark:bg-transparent rounded-full text-xs font-extrabold`}>
        {relativeLabel}
      </span>
    );
  }

  return (
    <time dateTime={date} className="text-xs font-bold">
      {formatDate(date)}
    </time>
  );
};

export default DateResponse;