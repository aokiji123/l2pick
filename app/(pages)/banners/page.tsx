"use client";

import MenuSidebar from "@/components/common/MenuSidebar";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannersItem from "@/components/elements/BannersItem";
import MobileMenu from "@/components/common/MobileMenu";
import { useTranslation } from "@/contexts/LanguageContext";

const Banners = () => {
  const { t } = useTranslation();

  return (
    <>
      <MobileMenu />
      <div className="flex items-stretch min-h-screen">
        <MenuSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none">
          <Tabs defaultValue="klassicheskie" className="w-full">
            <TabsList className="justify-start flex-wrap gap-3 border-b border-brand-gray dark:border-[#1f222c] w-full py-4 px-8">
              <TabsTrigger
                className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value="klassicheskie"
              >
                {t("banners_classical")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value="niz-levo"
              >
                {t("banners_bottom_left")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value="niz-pravo"
              >
                {t("banners_bottom_right")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value="verkh-levo"
              >
                {t("banners_top_left")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value="verkh-pravo"
              >
                {t("banners_top_right")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="klassicheskie">
              <BannersItem position={1} />
            </TabsContent>
            <TabsContent value="niz-levo">
              <BannersItem position={2} />
            </TabsContent>
            <TabsContent value="niz-pravo">
              <BannersItem position={3} />
            </TabsContent>
            <TabsContent value="verkh-levo">
              <BannersItem position={4} />
            </TabsContent>
            <TabsContent value="verkh-pravo">
              <BannersItem position={5} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Banners;
