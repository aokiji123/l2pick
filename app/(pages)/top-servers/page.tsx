"use client";

import MobileFilterSidebar from "@/components/common/MobileFilterSidebar";
import SearchSidebar from "@/components/common/SearchSidebar";
import ServerCard from "@/components/elements/ServerCard";
import { useTop5Servers } from "@/lib/queries/useServers";
import React from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRegisterLoader } from "@/lib/hooks/useRegisterLoader";

const TopServers = () => {
  const { data: topServers, isLoading, error } = useTop5Servers();
  const { t } = useTranslation();

  // Register this component's loading state with the global loader
  useRegisterLoader(isLoading, "top-servers-page");

  if (error) {
    return (
      <>
        <MobileFilterSidebar />
        <div className="flex items-stretch min-h-screen">
          <SearchSidebar />
          <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
            <div className="text-center text-red-500">
              {t("top_servers_error")}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileFilterSidebar />
      <div className="flex items-stretch min-h-screen">
        <SearchSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
          {/* Server List */}
          <div className="space-y-4">
            {topServers?.data?.map((server, index) => (
              <ServerCard
                key={server.id}
                id={index + 1}
                serverId={server.id}
                title={server.announce_name}
                description={server.short_description}
                tags={[
                  server.chronicle?.name || "",
                  server.server_type_data?.name || "",
                ]}
                rating={server.rating_stars}
                votes={server.votes_count}
                comments={server.reviews_count}
                launchDate={server.display_date}
                image={server.logo}
                hasVoted={false}
                slug={server.project?.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopServers;
