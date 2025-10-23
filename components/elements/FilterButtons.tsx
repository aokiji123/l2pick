"use client";
import { Chronicle } from "@/lib/types/chronicle";
import { Rate } from "@/lib/types/rate";
import { Server } from "@/lib/types/server";
import React from "react";
import { useFilter } from "@/contexts/FilterContext";
import { useRouter } from "next/navigation";

interface props {
  servers?: Server[];
  rates?: Rate[];
  chronicles?: Chronicle[];
  colSpan: string;
}

const FilterButtons = ({ rates, chronicles, servers, colSpan }: props) => {
  const router = useRouter();
  const { filters, pendingFilters, setPendingRate, setPendingChronicle } =
    useFilter();

  const handleFilterClick = (
    filterId: string,
    filterType: "rate" | "chronicle" | "server",
    filterValue: string,
    serverSlug?: string
  ) => {
    if (filterType === "rate") {
      setPendingRate(filterId);
    } else if (filterType === "chronicle") {
      setPendingChronicle(parseInt(filterId));
    } else if (filterType === "server" && serverSlug) {
      router.push(`/server-info?slug=${serverSlug}`);
    }
  };

  return (
    <>
      {rates?.map((rate) => (
        <button
          key={rate.id}
          onClick={() =>
            handleFilterClick(rate.name.replace("x", ""), "rate", rate.name)
          }
          className={`${colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 ${
            filters.selectedRate === rate.name.replace("x", "") ||
            pendingFilters.pendingRate === rate.name.replace("x", "")
              ? "border-[#ee8b21]"
              : "border-brand-btn-gray-3"
          }`}
        >
          {rate.name}
        </button>
      ))}
      {chronicles?.map((chronicle) => (
        <button
          key={chronicle.id}
          onClick={() =>
            handleFilterClick(
              chronicle.id.toString(),
              "chronicle",
              chronicle.name
            )
          }
          className={`${colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 ${
            filters.selectedChronicle === chronicle.id ||
            pendingFilters.pendingChronicle === chronicle.id
              ? "border-[#ee8b21]"
              : "border-brand-btn-gray-3"
          }`}
        >
          {chronicle.name}
        </button>
      ))}
      {servers?.map((server) => (
        <button
          key={server.id}
          onClick={() =>
            handleFilterClick(
              server.id.toString(),
              "server",
              server.announce_name,
              server.url_slug
            )
          }
          className={`${colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 border-brand-btn-gray-3`}
        >
          {server.announce_name}
        </button>
      ))}
    </>
  );
};

export default FilterButtons;
