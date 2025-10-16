import React from 'react';
import { isToday, isTomorrow, isYesterday, format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  date: string;
  color?: boolean;
  topserver?: boolean;
}

function getRelativeDateLabel(dateString: string): "Сегодня" | "Завтра" | "Вчера" | null {
  const date = new Date(dateString);
  if (isToday(date)) return "Сегодня";
  if (isTomorrow(date)) return "Завтра";
  if (isYesterday(date)) return "Вчера";
  return null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'dd.MM.yy', { locale: ru });
}

const DateResponse: React.FC<Props> = ({ date, color = false, topserver = false }) => {
  const relativeLabel = getRelativeDateLabel(date);

  if (relativeLabel) {
    let bgColor = "";
    if (relativeLabel === "Сегодня") {
      bgColor = topserver ? "text-white" : "text-brand-green";
    } else if (relativeLabel === "Завтра") {
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