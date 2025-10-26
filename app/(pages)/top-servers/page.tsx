"use client";

import MobileFilterSidebar from "@/components/common/MobileFilterSidebar";
import SearchSidebar from "@/components/common/SearchSidebar";
import ServerCard from "@/components/elements/ServerCard";
import { useTop5Servers } from "@/lib/queries/useServers";
import React from "react";

const TopServers = () => {
  const { data: topServers, isLoading, error } = useTop5Servers();

  if (isLoading) {
    return (
      <>
        <MobileFilterSidebar />
        <div className="flex items-stretch min-h-screen">
          <SearchSidebar />
          <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-2xl"></div>
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-2xl"></div>
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MobileFilterSidebar />
        <div className="flex items-stretch min-h-screen">
          <SearchSidebar />
          <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
            <div className="text-center text-red-500">
              Error loading servers
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
