"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  selectedRate: string | null;
  selectedChronicle: number | null;
}

interface PendingFilterState {
  pendingRate: string | null;
  pendingChronicle: number | null;
}

interface FilterContextType {
  filters: FilterState;
  pendingFilters: PendingFilterState;
  setPendingRate: (rateId: string | null) => void;
  setPendingChronicle: (chronicleId: number | null) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  clearPendingFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedRate: null,
    selectedChronicle: null,
  });

  const [pendingFilters, setPendingFilters] = useState<PendingFilterState>({
    pendingRate: null,
    pendingChronicle: null,
  });

  const setPendingRate = (rateId: string | null) => {
    setPendingFilters((prev) => ({
      pendingRate: rateId,
      pendingChronicle: null, // Clear chronicle when rate is selected
    }));
  };

  const setPendingChronicle = (chronicleId: number | null) => {
    setPendingFilters((prev) => ({
      pendingRate: null, // Clear rate when chronicle is selected
      pendingChronicle: chronicleId,
    }));
  };

  const applyFilters = () => {
    setFilters({
      selectedRate: pendingFilters.pendingRate,
      selectedChronicle: pendingFilters.pendingChronicle,
    });
  };

  const clearFilters = () => {
    setFilters({
      selectedRate: null,
      selectedChronicle: null,
    });
    setPendingFilters({
      pendingRate: null,
      pendingChronicle: null,
    });
  };

  const clearPendingFilters = () => {
    setPendingFilters({
      pendingRate: null,
      pendingChronicle: null,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        pendingFilters,
        setPendingRate,
        setPendingChronicle,
        applyFilters,
        clearFilters,
        clearPendingFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
