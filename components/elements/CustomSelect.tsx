"use client";
import React, { useState, useEffect } from "react";
import { useFilter } from "@/contexts/FilterContext";

interface props {
  options: string[];
  title: string;
  filterType?: "rate" | "chronicle";
  filterData?: any[];
}

const CustomSelect = ({ options, title, filterType, filterData }: props) => {
  const [selectedOption, setSelectedOption] = useState<string>(title);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const {
    setPendingRate,
    setPendingChronicle,
    clearPendingFilters,
    filters,
    pendingFilters,
  } = useFilter();

  // Update selected option when filters change
  useEffect(() => {
    if (filterType && filterData) {
      if (filterType === "rate") {
        if (filters.selectedRate) {
          const selectedItem = filterData.find(
            (item) => item.name.replace("x", "") === filters.selectedRate
          );
          if (selectedItem) {
            setSelectedOption(selectedItem.name);
          }
        } else if (pendingFilters.pendingRate) {
          const selectedItem = filterData.find(
            (item) => item.name.replace("x", "") === pendingFilters.pendingRate
          );
          if (selectedItem) {
            setSelectedOption(selectedItem.name);
          }
        } else {
          setSelectedOption(title);
        }
      } else if (filterType === "chronicle") {
        if (filters.selectedChronicle) {
          const selectedItem = filterData.find(
            (item) => item.id === filters.selectedChronicle
          );
          if (selectedItem) {
            setSelectedOption(selectedItem.name);
          }
        } else if (pendingFilters.pendingChronicle) {
          const selectedItem = filterData.find(
            (item) => item.id === pendingFilters.pendingChronicle
          );
          if (selectedItem) {
            setSelectedOption(selectedItem.name);
          }
        } else {
          setSelectedOption(title);
        }
      }
    }
  }, [filters, pendingFilters, filterType, filterData, title]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsSelectOpen(false);

    // If this is a filter select, update the pending filter context
    if (filterType && filterData) {
      const selectedItem = filterData.find((item) => item.name === option);
      if (selectedItem) {
        if (filterType === "rate") {
          // Extract numeric value from rate name (e.g., "x7" -> "7")
          const rateValue = selectedItem.name.replace("x", "");
          setPendingRate(rateValue);
        } else if (filterType === "chronicle") {
          setPendingChronicle(selectedItem.id);
        }
      }
    } else {
      // If it's the default option (title), clear pending filters
      clearPendingFilters();
    }
  };

  // Check if this select has an active filter or pending filter
  const isActive =
    (filterType === "rate" &&
      (filters.selectedRate || pendingFilters.pendingRate)) ||
    (filterType === "chronicle" &&
      (filters.selectedChronicle || pendingFilters.pendingChronicle));

  return (
    <>
      <div className="col-span-1 relative">
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          className={`w-full h-12 px-4 flex items-center justify-between text-left text-white text-sm hover:bg-opacity-80 transition-colors ${
            isSelectOpen ? "rounded-t-xl" : "rounded-xl"
          } ${
            isActive
              ? "bg-brand-btn border border-brand-btn"
              : "bg-brand-btn-gray-3"
          }`}
        >
          <span className="line-clamp-2">{selectedOption}</span>
          <svg
            className={`w-4 h-4 transition-transform shrink-0 ${
              isSelectOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isSelectOpen && (
          <div className="absolute top-full -translate-y-[4px] left-0 right-0 mt-1 bg-brand-btn-gray-3 rounded-b-xl overflow-hidden shadow-lg z-50">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option)}
                className="w-full px-4 py-3 text-left text-xs text-white cursor-pointer hover:opacity-90 border-b border-brand-main-2 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
