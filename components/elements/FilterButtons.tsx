"use client";
import { Chronicle } from "@/lib/types/chronicle";
import { Rate } from "@/lib/types/rate";
import { Server } from "@/lib/types/server";
import React, { useState } from "react";

interface props {
  servers?: Server[];
  rates?: Rate[];
  chronicles?: Chronicle[];
  colSpan: string;
}

const FilterButtons = ({ rates, chronicles, servers, colSpan }: props) => {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <>
      {rates?.map((rate) => (
        <button
          key={rate.id}
          onClick={() => handleFilterClick(rate.id.toString())}
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
          onClick={() => handleFilterClick(chronicle.id.toString())}
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
          onClick={() => handleFilterClick(server.id.toString())}
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
