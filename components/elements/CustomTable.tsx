"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

interface TableData {
  id: number;
  serverName: string;
  ip: string;
  date: string;
}

interface CustomTableProps {
  data: TableData[];
}

// Reusable components for better maintainability
const TableHeader: React.FC<{ isDesktop?: boolean }> = ({
  isDesktop = false,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex items-center bg-transparent text-[#7a838d] text-nowrap font-medium ${
        isDesktop ? "px-3.5 py-3" : "px-3 py-2"
      }`}
    >
      <div className="w-8 text-sm">{t("custom_table_number")}</div>
      <div className={`flex-1 ${isDesktop ? "text-sm" : "text-xs"}`}>
        {isDesktop ? t("custom_table_server_name") : t("custom_table_server")}
      </div>
      <div className="w-28 text-sm">{t("custom_table_ip")}</div>
      <div className="w-24 text-sm">{t("custom_table_date")}</div>
    </div>
  );
};

const TableRow: React.FC<{
  item: TableData;
  index: number;
  isDesktop?: boolean;
}> = ({ item, index, isDesktop = false }) => {
  const rowClasses = useMemo(() => {
    const baseClasses = `flex items-center border border-[#e0e4eb] dark:border-[#292c37] transition-colors text-brand-primary dark:text-white font-bold px-4 py-3`;

    return `${baseClasses} bg-white dark:bg-[#292c37] rounded-xl h-10 hover:opacity-90`;
  }, [index, isDesktop]);

  return (
    <Link href={"#"} className={rowClasses}>
      <div className="w-8 text-sm">{item.id}</div>
      <div className={`flex-1 text-sm truncate`} title={item.serverName}>
        {item.serverName}
      </div>
      <div className="w-28 text-sm truncate" title={item.ip}>
        {item.ip}
      </div>
      <div className="w-20 text-sm">{item.date}</div>
    </Link>
  );
};

const MobileCard: React.FC<{
  item: TableData;
  index: number;
}> = ({ item, index }) => {
  const { t } = useTranslation();
  const cardClasses = useMemo(() => {
    const baseClasses =
      "border border-[#e0e4eb] dark:border-[#292c37] rounded-lg p-3 mb-2 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20";

    return `${baseClasses} bg-white dark:bg-[#292c37] rounded-xl`;
  }, [index]);

  return (
    <div className={cardClasses}>
      <div className="grid grid-cols-1 gap-2 text-sm">
        {[
          { label: t("custom_table_number_label"), value: item.id },
          {
            label: t("custom_table_server_label"),
            value: item.serverName,
            truncate: true,
          },
          { label: t("custom_table_ip_label"), value: item.ip, truncate: true },
          { label: t("custom_table_date_label"), value: item.date },
        ].map((field, fieldIndex) => (
          <div key={fieldIndex} className="flex items-center justify-between">
            <span className="text-[#7a838d] text-sm font-medium flex-shrink-0">
              {field.label}
            </span>
            <span
              className={`text-brand-primary dark:text-white font-bold ${
                field.truncate ? "truncate max-w-[60%]" : ""
              }`}
              title={field.truncate ? String(field.value) : undefined}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  // Memoize the data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Desktop Table */}
      <div className="hidden md:flex flex-col w-full h-full">
        <TableHeader isDesktop />
        <div className="flex-1 overflow-y-auto scroll-style space-y-2 pr-2">
          {memoizedData.map((item, index) => (
            <TableRow
              key={`desktop-${item.id}-${index}`}
              item={item}
              index={index}
              isDesktop
            />
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex-1 overflow-y-auto scroll-style pr-2">
        {memoizedData.map((item, index) => (
          <MobileCard
            key={`mobile-${item.id}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
