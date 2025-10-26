"use client";
import MenuSidebar from "@/components/common/MenuSidebar";
import MobileMenu from "@/components/common/MobileMenu";
import DateResponse from "@/components/elements/DateResponse";
import ServerActions from "@/components/server-components/ServerActions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useServers } from "@/lib/queries/useServers";

const Servers = () => {
  const { data: myServersData, isLoading } = useServers({ my_servers: 1 });
  const myServers = myServersData?.data || [];

  return (
    <>
      <MobileMenu />
      <div className="flex items-stretch min-h-screen">
        <MenuSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none">
          <div className="grid grid-cols-2 xl:grid-cols-5 items-start xl:h-full">
            <div className="order-2 col-span-2 xl:col-span-3 border-t xl:border-t-0 xl:border-r border-brand-slate-gray/30 h-full py-7">
              <h2 className="font-bold text-brand-primary dark:text-white mb-1 px-4 lg:px-7">
                Добавление сервера
              </h2>

              <ServerActions />
            </div>
            <div className="order-1 xl:order-3 col-span-2 xl:col-span-2 py-7 px-4 md:p-7 min-w-[250px] w-full h-full overflow-hidden flex flex-col">
              <div className="space-y-4 overflow-y-auto max-h-[690px] pr-2 scroll-style">
                {isLoading ? (
                  <div className="bg-brand-gray-3 dark:bg-[#20242c] rounded-2xl p-5 text-center py-8 text-brand-header-light dark:text-white">
                    Загрузка...
                  </div>
                ) : myServers.length > 0 ? (
                  myServers.map((server) => (
                    <div
                      key={server.id}
                      className="bg-brand-gray-3 dark:bg-[#20242c] rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full overflow-hidden relative">
                          {server.logo ? (
                            <Image
                              src={server.logo}
                              fill
                              alt="server logo"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-btn flex items-center justify-center text-white font-bold">
                              {server.announce_name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h3 className="font-extrabold text-brand-header-light dark:text-white">
                          {server.announce_name}
                        </h3>
                      </div>

                      <div className="divide-y divide-[#d9e2e9] dark:divide-[#2a2d38]">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                            Позиция в рейтинге
                          </span>
                          <span
                            className={`text-brand-primary dark:text-white font-bold truncate`}
                          >
                            {server.ranking_position || "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                            Сервер ID
                          </span>
                          <span
                            className={`text-brand-primary dark:text-white font-bold truncate`}
                          >
                            {server.id}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                            Голоса
                          </span>
                          <span
                            className={`text-brand-primary dark:text-white font-bold truncate`}
                          >
                            {server.votes_count}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                            Сайт
                          </span>
                          <Link
                            href={server.website_url || "#"}
                            target="_blank"
                            className={`text-brand-btn font-bold truncate hover:underline`}
                          >
                            {server.website_url
                              ?.replace("https://", "")
                              .replace("http://", "") || "-"}
                          </Link>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                            Открытие
                          </span>
                          <DateResponse date={server.launch_date} />
                        </div>
                      </div>

                      <button
                        className={`flex items-center justify-center w-full h-8 text-white text-xs font-medium cursor-pointer rounded-xl ${
                          server.moderation_status === "approved"
                            ? "bg-brand-green"
                            : server.moderation_status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {server.moderation_status === "approved"
                          ? "Промодерирован и активен"
                          : server.moderation_status === "pending"
                          ? "На модерации"
                          : "Отклонён"}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-brand-gray-3 dark:bg-[#20242c] rounded-2xl p-5 text-center py-8 text-brand-header-light dark:text-white">
                    У вас пока нет серверов. Создайте новый сервер!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Servers;
