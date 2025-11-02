"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiFilter } from "react-icons/ci";
import { FilterContent } from "./SearchSidebar";
import Image from "next/image";
import Link from "next/link";
import { TopIcon } from "@/icons";
import { useTop5Servers } from "@/lib/queries/useServers";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRegisterLoader } from "@/lib/hooks/useRegisterLoader";

const MobileFilterSidebar = () => {
  const { data: top5Servers, isLoading } = useTop5Servers();
  const { t } = useTranslation();

  // Register this component's loading state with the global loader
  useRegisterLoader(isLoading, "mobile-sidebar-top5");

  return (
    <Sheet>
      <div>
        <SheetTrigger className="lg:hidden w-full cursor-pointer flex items-center justify-center gap-2 bg-brand-btn-gray-3 text-white text-sm h-10 border border-brand-btn-gray-3 rounded-xl transition-all duration-200 mb-3">
          <CiFilter className="text-lg stroke-1" />
          {t("mobile_filter_title")}
        </SheetTrigger>
        <div className="lg:hidden bg-[#292c34] p-5 rounded-xl w-full mb-5">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <TopIcon />
            <h2 className="text-white font-bold uppercase tracking-[1px]">
              {t("mobile_top_5_servers")}
            </h2>
          </div>

          {/* Server list */}
          <div className="flex flex-col gap-1.5">
            {top5Servers?.data.map((server) => {
              // Fon classi rank bo‘yicha
              const bgClass = server.id === 1 ? "" : "bg-[#323741]";

              // Rank doira classi rank bo‘yicha
              const rankClass =
                server.id === 1
                  ? "bg-[#ea704e]"
                  : server.id === 2 || server.id === 3
                    ? "bg-[linear-gradient(180deg,#b8573c,#ac543c,#874c3e,#594140,#4f3f40)]"
                    : "bg-[#414753]";

              return (
                <Link
                  href={"/top-servers"}
                  key={server.id}
                  className={`flex relative z-0 items-center bg-brand-secondary-3 justify-between rounded-xl pl-1.5 pr-3 h-[38px] hover:opacity-90 !overflow-hidden ${bgClass}`}
                >
                  <div className={`flex items-center gap-3.5 z-20`}>
                    <span
                      className={`w-7 h-7 flex items-center justify-center rounded-xl text-xs font-extrabold text-white ${rankClass}`}
                    >
                      {server.id}
                    </span>
                    <span className="text-white text-sm font-medium overflow-hidden truncate text-ellipsis">
                      {server.announce_name}
                    </span>
                  </div>

                  {/* <span className="text-sm text-brand-orange font-semibold z-20">
                    {server.price}
                  </span> */}
                  {/* Overlay for rank 1 */}
                  {server.id === 1 && (
                    <>
                      <div className="absolute size-full left-0 bg-[linear-gradient(135deg,#b8573c,#ac543c,#874c3e,#594140,#4f3f40)] opacity-80 z-10"></div>
                      <Image
                        className="absolute object-cover size-full "
                        src={"/fire.png"}
                        fill
                        alt="fire"
                      />
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <SheetContent
        className="bg-brand-main border-none w-full"
        side="left"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">title</SheetTitle>
        </SheetHeader>
        <div className="max-h-screen overflow-y-auto scroll-style">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSidebar;
