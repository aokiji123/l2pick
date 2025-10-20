"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  options: string[];
  title: string;
  filterType?: "rate" | "chronicle";
  filterData?: any[];
}

const CustomSelect = ({ options, title, filterType, filterData }: props) => {
  const [selectedOption, setSelectedOption] = useState<string>(title);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsSelectOpen(false);

    // If this is a filter select, navigate to servers page with filter
    if (filterType && filterData) {
      const selectedItem = filterData.find((item) => item.name === option);
      if (selectedItem) {
        const params = new URLSearchParams();
        if (filterType === "rate") {
          params.set("rate", selectedItem.id.toString());
        } else if (filterType === "chronicle") {
          params.set("chronicle_id", selectedItem.id.toString());
        }
        router.push(`/servers?${params.toString()}`);
      }
    }
  };
  return (
    <>
      <div className="col-span-1 relative">
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          className={`w-full h-12 bg-brand-btn-gray-3 px-4 flex items-center justify-between text-left text-white text-sm hover:bg-opacity-80 transition-colors ${
            isSelectOpen ? "rounded-t-xl" : "rounded-xl"
          }`}
        >
          <span>{selectedOption}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
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
