"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck, FaHome, FaThumbsUp } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomBadge from "@/components/elements/CustomBadge";
import { renderStars } from "@/components/elements/RenderStars";
import ImageCarousel from "@/components/elements/ImageCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralInfo from "@/components/server-components/GeneralInfo";
import Testimonials from "@/components/server-components/Testimonials";
import { ChartAreaGradient } from "@/components/elements/ChartArea";
import CustomDialog from "@/components/server-components/CustomDialog";
import { useProjectBySlug } from "@/lib/queries/useProjects";
import { useGetVotesHistory } from "@/lib/queries/useVotes";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRegisterLoader } from "@/lib/hooks/useRegisterLoader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProjectInfoContent = () => {
  const [isVoted, setIsVoted] = useState(false);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const serverIdParam = searchParams.get("serverId");
  const { t } = useTranslation();

  const { data: project, isLoading, error } = useProjectBySlug(slug);
  const { data: votesHistory, isLoading: isLoadingVotes } = useGetVotesHistory(
    project?.id?.toString() || ""
  );

  // Register loading states with the global loader
  useRegisterLoader(isLoading, "project-info-project");
  useRegisterLoader(isLoadingVotes, "project-info-votes");

  const handleVote = () => {
    if (!isVoted) {
      setIsVoted(true);
    }
  };

  if (error || !project) {
    return (
      <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl p-3 lg:p-4 mb-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-brand-primary-3 dark:text-white">
            {t("project_info_not_found")}
          </div>
        </div>
      </div>
    );
  }

  // Find the server by ID if serverId is provided, otherwise use the first server
  const server = serverIdParam
    ? project?.servers?.find((s) => s.id.toString() === serverIdParam) ||
      project?.servers?.[0]
    : project?.servers?.[0];

  // If no server is found
  if (!server) {
    return (
      <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl p-3 lg:p-4 mb-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-brand-primary-3 dark:text-white">
            {t("project_info_servers_not_found")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl p-3 lg:p-4 mb-4">
        <Breadcrumb>
          <BreadcrumbList className="h-10 rounded-xl flex gap-3.5 items-center bg-brand-gray-2 dark:bg-[#171a21] text-black dark:text-white px-3">
            <BreadcrumbItem>
              <FaHome className="size-4" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-medium text-xs" href="/">
                {t("project_info_home")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-medium text-xs"
                href="/top-servers"
              >
                {project.name || t("project_info_projects")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-extrabold text-xs">
                {project.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-6 mt-7">
          <ImageCarousel />
          <div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="md:text-3xl font-extrabold leading-4 text-brand-primary-3 dark:text-white">
                  {project.name}
                </h3>
                {server && <CustomBadge launchDate={server.launch_date} />}
              </div>

              <p className="text-sm text-[#4f5961] leading-4 dark:text-[#969ca9] mb-5 line-clamp-2">
                {server?.short_description || server?.full_description || ""}
              </p>
              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {server?.chronicle && (
                  <span className="px-2 py-1 rounded-md text-xs leading-4 font-bold bg-brand-btn text-white">
                    {server.chronicle.name}
                  </span>
                )}
                {server && (
                  <span className="px-2 py-1 rounded-md text-xs leading-4 font-bold bg-brand-btn-gray-3 text-white">
                    {t("project_info_server")}
                  </span>
                )}
                {server && (
                  <span
                    className={`px-2 py-1 rounded-md text-xs leading-4 font-bold dark:text-white bg-white dark:bg-brand-dark border border-[#e6e9ec] dark:border-[#2c303c]`}
                  >
                    x{server.rate}
                  </span>
                )}
              </div>
              {/* rat and but */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-center justify-between w-full mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars({ rating: server?.rating_stars || 0 })}
                  </div>
                  <span className="text-xs font-bold text-brand-primary dark:text-[#84889a]">
                    {t("project_info_votes")}{" "}
                    <span className="text-brand-btn">
                      {server?.votes_count || project.total_votes}
                    </span>
                  </span>
                </div>
                <div className="">
                  {isVoted ? (
                    <div className="bg-brand-btn rounded-lg h-10 flex items-center justify-between">
                      <span className="text-sm font-extrabold leading-4 text-white px-3.5">
                        10:57:40
                      </span>
                      <div className="flex items-center gap-2 text-white bg-brand-primary h-full rounded-lg px-4">
                        <FaCheck className="text-sm text-brand-btn" />
                        <span className="text-xs leading-4 font-extrabold">
                          {t("project_info_vote_counted")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <CustomDialog
                        handleClick={handleVote}
                        serverId={server.id.toString()}
                        serverName={server.announce_name}
                      />
                    </>
                  )}
                </div>
              </div>

              <button className="w-full bg-brand-btn cursor-pointer hover:bg-brand-btn/90 text-white rounded-xl px-4 h-[53px] flex items-center justify-center gap-2 text-lg font-extrabold transition-colors relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10">
                {t("project_info_play")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl pb-4">
        <Tabs defaultValue="general" className="w-full gap-0">
          <div className="p-3 lg:px-7 lg:py-0">
            <TabsList className="justify-start flex-wrap gap-3 border-b border-brand-gray dark:border-[#1f222c] w-full">
              <TabsTrigger
                className="relative before:absolute before:w-full before:h-0.5 data-[state=active]:before:bg-brand-btn before:-bottom-px text-sm data-[state=active]:text-brand-btn py-5 rounded-none !shadow-none cursor-pointer font-medium dark:text-white"
                value="general"
              >
                {t("project_info_general")}
              </TabsTrigger>
              <TabsTrigger
                className="relative before:absolute before:w-full before:h-0.5 data-[state=active]:before:bg-brand-btn before:-bottom-px text-sm data-[state=active]:text-brand-btn py-5 rounded-none !shadow-none cursor-pointer font-medium dark:text-white"
                value="reviews"
              >
                {t("project_info_reviews")}
              </TabsTrigger>
              <TabsTrigger
                className="relative before:absolute before:w-full before:h-0.5 data-[state=active]:before:bg-brand-btn before:-bottom-px text-sm data-[state=active]:text-brand-btn py-5 rounded-none !shadow-none cursor-pointer font-medium dark:text-white"
                value="history"
              >
                {t("project_info_vote_history")}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="general">
            <GeneralInfo project={project} selectedServerId={serverIdParam} />
          </TabsContent>
          <TabsContent value="reviews">
            <Testimonials project={project} />
          </TabsContent>
          <TabsContent value="history">
            <ChartAreaGradient data={votesHistory} isLoading={isLoadingVotes} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

const ProjectInfoLoadingFallback = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl p-3 lg:p-4 mb-4">
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    </div>
  );
};

const ProjectInfo = () => {
  return (
    <Suspense fallback={<ProjectInfoLoadingFallback />}>
      <ProjectInfoContent />
    </Suspense>
  );
};

export default ProjectInfo;
