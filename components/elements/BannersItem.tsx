"use client";

import Image from "next/image";
import React from "react";
import { useAdvertisementsBanner } from "@/lib/queries/useAdvertisements";
import { AdvertisementBanner } from "@/lib/types/advertisement";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRegisterLoader } from "@/lib/hooks/useRegisterLoader";

interface props {
  data?: number; // Optional for backward compatibility
  position?: number; // Filter banners by position
}

const BannersItem = ({ data, position }: props) => {
  const { t } = useTranslation();
  const {
    data: advertisementsData,
    isLoading,
    error,
  } = useAdvertisementsBanner();

  // Register loading state with the global loader
  useRegisterLoader(isLoading, `banners-item-${position || "all"}`);

  // Use real data if available, otherwise fall back to mock data
  const allBanners = (advertisementsData?.data as AdvertisementBanner[]) || [];

  // Filter banners by position if provided
  const banners =
    position !== undefined
      ? allBanners.filter((banner) => banner.position === position)
      : allBanners;

  const displayCount = data || banners.length;

  if (error) {
    return (
      <div className="flex flex-col gap-4 py-4 px-5">
        <div className="text-center text-red-500 py-8">
          {t("banners_error_loading")}
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="flex flex-col gap-4 py-4 px-5">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t("banners_no_banners")}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 px-5">
      {banners.slice(0, displayCount).map((banner) => (
        <div
          key={banner.id}
          className="flex flex-col md:flex-row items-center md:items-stretch gap-5"
        >
          <div className="relative size-[166px] overflow-hidden rounded-2xl">
            <Image
              src={banner.image}
              fill
              alt={banner.alt || banner.title}
              className="object-cover"
            />
          </div>
          <div className="flex-1 bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] rounded-xl px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {banner.title}
            </h3>
            <p className="text-[#646d78] text-xs font-medium leading-4 md:line-clamp-[8]">
              {banner.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannersItem;
