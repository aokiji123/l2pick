"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Titlemini from "./TitleMini";
import { ProjectDetail } from "@/lib/types/project";

type GeneralInfoProps = {
  project: ProjectDetail;
};

const GeneralInfo = ({ project }: GeneralInfoProps) => {
  if (!project?.servers || project.servers.length === 0) {
    return (
      <div className="py-6 px-3 lg:px-7">
        <div className="text-center text-brand-primary-3 dark:text-white">
          Серверы не найдены
        </div>
      </div>
    );
  }

  const defaultServer = project.servers[0];
  const defaultValue = defaultServer.url_slug || defaultServer.id.toString();

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
                  <Titlemini title="Основная информация" className="mb-5" />
                  <div className="w-full space-y-2 pt-1">
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        Открытие
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.display_date}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        Хроники
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.chronicle.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        Рейты
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        x{server.rate}
                      </p>
                    </div>
                    <div className="flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3">
                      <p className="text-sm text-[#5b646b] dark:text-[#797e8c] font-medium">
                        Статус
                      </p>
                      <p className="text-sm font-bold text-brand-primary dark:text-white">
                        {server.status === "opened" ? "Открыт" : "Скоро"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <Titlemini title="Описание" className="mb-5" />
                  <div
                    className="text-sm font-medium text-brand-primary-3 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html:
                        server.full_description ||
                        server.short_description ||
                        "Описание отсутствует",
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
