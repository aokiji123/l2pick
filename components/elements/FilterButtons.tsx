"use client";
import { Chronicle } from "@/lib/types/chronicle";
import { Rate } from "@/lib/types/rate";
import { Server } from "@/lib/types/server";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  servers?: Server[];
  rates?: Rate[];
  chronicles?: Chronicle[];
  colSpan: string;
}

const FilterButtons = ({ rates, chronicles, servers, colSpan }: props) => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const router = useRouter();

  const handleFilterClick = (
    filterId: string,
    filterType: "rate" | "chronicle" | "server",
    filterValue: string
  ) => {
    setActiveFilter(filterId);

    // Build query parameters based on filter type
    const params = new URLSearchParams();

    if (filterType === "rate") {
      params.set("rate", filterId);
    } else if (filterType === "chronicle") {
      params.set("chronicle_id", filterId);
    } else if (filterType === "server") {
      params.set("search", filterValue);
    }

    // Navigate to servers page with filter parameters
    router.push(`/servers?${params.toString()}`);
  };

  return (
    <>
      {rates?.map((rate) => (
        <button
          key={rate.id}
          onClick={() =>
            handleFilterClick(rate.id.toString(), "rate", rate.name)
          }
          className={`${colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 ${
            activeFilter === rate.name
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
            activeFilter === chronicle.name
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
              server.announce_name
            )
          }
          className={`${colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 ${
            activeFilter === server.announce_name
              ? "border-[#ee8b21]"
              : "border-brand-btn-gray-3"
          }`}
        >
          {server.announce_name}
        </button>
      ))}
    </>
  );
};

export default FilterButtons;
