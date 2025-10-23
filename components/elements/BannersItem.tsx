import Image from "next/image";
import React from "react";
import { useAdvertisementsBanner } from "@/lib/queries/useAdvertisements";
import { AdvertisementBanner } from "@/lib/types/advertisement";

interface props {
  data?: number; // Optional for backward compatibility
  position?: number; // Filter banners by position
}

const BannersItem = ({ data, position }: props) => {
  const {
    data: advertisementsData,
    isLoading,
    error,
  } = useAdvertisementsBanner();

  // Use real data if available, otherwise fall back to mock data
  const allBanners = (advertisementsData?.data as AdvertisementBanner[]) || [];

  // Filter banners by position if provided
  const banners =
    position !== undefined
      ? allBanners.filter((banner) => banner.position === position)
      : allBanners;

  const displayCount = data || banners.length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-4 px-5">
        {[...Array(displayCount)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center md:items-stretch gap-5"
          >
            <div className="relative size-[166px] overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="flex-1 bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] rounded-xl px-5 py-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 py-4 px-5">
        <div className="text-center text-red-500 py-8">
          Error loading banners. Please try again later.
        </div>
      </div>
    );
  }

  if (banners.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-4 py-4 px-5">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No banners available for this position.
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
