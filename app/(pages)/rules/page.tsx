"use client";

import MobileFilterSidebar from "@/components/common/MobileFilterSidebar";
import SearchSidebar from "@/components/common/SearchSidebar";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Rules() {
  const { t } = useTranslation();

  const texts = [
    t("rules_paragraph_1"),
    t("rules_paragraph_2"),
    t("rules_paragraph_3"),
    t("rules_paragraph_4"),
    t("rules_paragraph_5"),
    t("rules_paragraph_6"),
    t("rules_paragraph_7"),
    t("rules_paragraph_8"),
  ];
  return (
    <>
      <MobileFilterSidebar />
      <div className="flex items-stretch min-h-screen">
        <SearchSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
          <div className="lg:px-4 py-4">
            <h2 className="text-xl text-brand-primary-3 font-exo2 dark:text-white font-bold uppercase leading-7 mb-7">
              {t("rules_title")}
            </h2>
            <div className="flex flex-col gap-3.5 w-full">
              {texts.map((item, idx) => (
                <p
                  key={idx}
                  className="text-sm font-medium text-brand-primary-3 dark:text-white"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
