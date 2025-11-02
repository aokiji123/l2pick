"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Titlemini from "./TitleMini";
import { ProjectDetail } from "@/lib/types/project";
import { useTranslation } from "@/contexts/LanguageContext";

type GeneralInfoProps = {
  project: ProjectDetail;
  selectedServerId?: string | null;
};

const GeneralInfo = ({ project, selectedServerId }: GeneralInfoProps) => {
  const { t } = useTranslation();
  if (!project?.servers || project.servers.length === 0) {
    return (
      <div className="py-6 px-3 lg:px-7">
        <div className="text-center text-brand-primary-3 dark:text-white">
          {t("general_info_no_servers")}
        </div>
      </div>
    );
  }

  // Find the selected server by ID if provided, otherwise use the first server
  const selectedServer = selectedServerId
    ? project.servers.find((s) => s.id.toString() === selectedServerId) ||
      project.servers[0]
    : project.servers[0];
  
  const defaultValue = selectedServer.url_slug || selectedServer.id.toString();

  return (
    <div className="py-6 px-3 lg:px-7">
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="justify-start flex-wrap gap-3 w-full">
          {project.servers.map((server) => {
            const value = server.url_slug || server.id.toString();
            return (
              <TabsTrigger
                key={server.id}
                className="bg-brand-gray-2 dark:bg-[#20232d] data-[state=active]:bg-brand-btn data-[state=active]:text-white h-9 border border-[#dde5eb] dark:border-[#2a2f3a] rounded-lg !shadow-none cursor-pointer font-bold dark:text-white"
                value={value}
              >
                {server.announce_name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {project.servers.map((server) => {
          const value = server.url_slug || server.id.toString();
          return (
            <TabsContent key={server.id} value={value}>
              <div className="flex flex-col lg:flex-row items-start gap-8 py-6">
                <div className="md:max-w-[404px] w-full">
                  <Titlemini title={t("general_info_main_info")} className="mb-5" />
                  <div className="w-full space-y-2 pt-1">
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        {t("general_info_opening")}
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.display_date}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        {t("general_info_chronicles")}
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.chronicle.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        {t("general_info_rates")}
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        x{server.rate}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        {t("general_info_status")}
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.status === "opened" ? t("general_info_opened") : t("general_info_coming_soon")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <Titlemini title={t("general_info_description")} className="mb-5" />
                  <div
                    className="text-sm font-medium text-brand-primary-3 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html:
                        server.full_description ||
                        server.short_description ||
                        t("general_info_no_description"),
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default GeneralInfo;
