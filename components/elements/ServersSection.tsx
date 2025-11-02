"use client";
import { IoRocketSharp } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import ServerItemDropdown from "../server-components/ServerItemDropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroupedServers } from "@/lib/queries/useServers";
import { ServerResponse } from "@/lib/types/server";
import { useFilter } from "@/contexts/FilterContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRegisterLoader } from "@/lib/hooks/useRegisterLoader";
import { useState } from "react";

function Section({
  title,
  subtitle,
  icon,
  vip,
  servers,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  vip?: boolean;
  servers?: ServerResponse;
}) {
  const { t } = useTranslation();
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

  const handleToggle = (serverId: number) => {
    setOpenAccordionId((prev) => (prev === serverId ? null : serverId));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="flex items-center gap-1 text-brand-primary-3 dark:text-white font-bold text-lg">
          {icon}
          <span className="line-clamp-1 font-exo2">{title}</span>

          <span className="text-xs ml-1 mt-1 text-nowrap font-exo2">
            {subtitle}
          </span>
        </h3>
        {vip && (
          <span className="bg-brand-gray-2 dark:bg-[#13151d] font-exo2 text-sm text-nowrap flex items-center justify-center h-8 text-brand-btn font-extrabold px-3 rounded-md ">
            {t("servers_section_vip")}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {servers?.data?.map((server, index) => (
          <ServerItemDropdown
            key={server.id}
            topserver={index === 0}
            server={server}
            isOpen={openAccordionId === server.id}
            onToggle={() => handleToggle(server.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServersSection() {
  const { t, currentLanguage } = useTranslation();
  const { filters } = useFilter();

  const { data: groupedData, isLoading } = useGroupedServers({
    ...(filters.selectedRate && { rate: filters.selectedRate }),
    ...(filters.selectedChronicle && {
      chronicle_id: filters.selectedChronicle,
    }),
  });

  // Register this component's loading state with the global loader
  useRegisterLoader(isLoading, "servers-section");

  const convertToServerResponse = (
    servers: any[] | undefined,
  ): ServerResponse => ({
    data: servers || [],
  });

  // Helper function to format date and day
  const formatDateWithDay = (date: Date, locale: string) => {
    const day = date.toLocaleDateString(locale, { weekday: "long" });
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const formattedDate = date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `(${formattedDate} - ${capitalizedDay})`;
  };

  const locale = currentLanguage === "RU" ? "ru-RU" : "en-US";
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaySubtitle = formatDateWithDay(today, locale);
  const tomorrowSubtitle = formatDateWithDay(tomorrow, locale);

  const soonServers = convertToServerResponse(groupedData?.data?.coming_soon);
  const openedServersData = convertToServerResponse(groupedData?.data?.opened);
  const todayServersData = convertToServerResponse(groupedData?.data?.today);
  const tomorrowServersData = convertToServerResponse(
    groupedData?.data?.tomorrow,
  );

  return (
    <>
      <div className="md:hidden w-full relative">
        <Tabs defaultValue="soon" className="w-full">
          <TabsList className="bg-white dark:bg-brand-primary-3 h-14 grid grid-cols-4 sticky top-0 left-0 z-50 justify-start flex-wrap gap-3 w-full p-2 mb-3">
            <TabsTrigger
              className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white text-xs"
              value="soon"
            >
              {t("servers_section_soon")}
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white text-xs"
              value="opened"
            >
              {t("servers_section_opened")}
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white text-xs"
              value="today"
            >
              {t("servers_section_today")}
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white text-xs"
              value="tomorrow"
            >
              {t("servers_section_tomorrow")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="soon">
            <Section
              icon={
                <MdAccessTime className="text-brand-primary-3 dark:text-brand-btn" />
              }
              title={t("servers_section_coming_soon")}
              vip={true}
              servers={soonServers}
            />
          </TabsContent>
          <TabsContent value="opened">
            <Section
              icon={
                <IoRocketSharp className="text-brand-primary-3 dark:text-brand-btn" />
              }
              title={t("servers_section_already_opened")}
              vip={true}
              servers={openedServersData}
            />
          </TabsContent>
          <TabsContent value="today">
            <Section
              title={t("servers_section_today")}
              subtitle={todaySubtitle}
              servers={todayServersData}
            />
          </TabsContent>
          <TabsContent value="tomorrow">
            <Section
              title={t("servers_section_tomorrow")}
              subtitle={tomorrowSubtitle}
              servers={tomorrowServersData}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5.5 ">
        <Section
          icon={
            <MdAccessTime className="text-brand-primary-3 dark:text-brand-btn" />
          }
          title={t("servers_section_coming_soon")}
          vip={true}
          servers={soonServers}
        />
        <Section
          icon={
            <IoRocketSharp className="text-brand-primary-3 dark:text-brand-btn" />
          }
          title={t("servers_section_already_opened")}
          vip={true}
          servers={openedServersData}
        />
        <Section
          title={t("servers_section_today")}
          subtitle={todaySubtitle}
          servers={todayServersData}
        />
        <Section
          title={t("servers_section_tomorrow")}
          subtitle={tomorrowSubtitle}
          servers={tomorrowServersData}
        />
      </div>
    </>
  );
}
