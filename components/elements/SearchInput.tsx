"use client";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useServers } from "@/lib/queries/useServers";
import { Server } from "@/lib/types/server";
import { useTranslation } from "@/contexts/LanguageContext";

const SearchInput = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch servers for search suggestions
  const { data: serversData } = useServers({
    per_page: 50,
    sort: "rating",
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (value.length >= 2 && serversData?.data) {
      const filtered = serversData.data.filter(
        (server) =>
          server.announce_name.toLowerCase().includes(value.toLowerCase()) ||
          server.short_description
            ?.toLowerCase()
            .includes(value.toLowerCase()) ||
          server.rate?.toString().includes(value.toLowerCase()) ||
          server.chronicle?.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServers(filtered.slice(0, 8)); // Limit to 8 results for dropdown
      setShowDropdown(true);
    } else {
      setFilteredServers([]);
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // For general search, navigate to servers page with search params
      router.push(`/servers?search=${encodeURIComponent(searchValue.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server);
    setSearchValue(server.announce_name);
    setShowDropdown(false);
    router.push(`/project-info?slug=${encodeURIComponent(server.url_slug)}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative lg:static">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {/* input */}
      <form onSubmit={handleSearchSubmit}>
        <div className="bg-brand-primary-2 relative w-full h-12 overflow-hidden rounded-xl">
          <input
            ref={inputRef}
            className="absolute w-full h-full outline-none text-white placeholder:text-[#848a99] text-base tracking-[1px] pl-4 pr-12"
            type="text"
            placeholder={t("search_input_placeholder")}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="block absolute top-1/2 right-4 -translate-y-1/2 z-10"
          >
            <IoSearch className="text-brand-btn text-xl" />
          </button>
        </div>
      </form>

      {/* Dropdown menu */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute max-w-2xl z-50 w-full mt-1 bg-brand-primary-2 rounded-xl border border-brand-primary max-h-64 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredServers.length > 0 ? (
            filteredServers.map((server) => (
              <div
                key={server.id}
                className="p-3 hover:bg-brand-primary cursor-pointer border-b border-brand-primary last:border-b-0"
                onClick={() => handleServerSelect(server)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-white font-medium text-sm">
                    {server.announce_name}
                  </h4>
                  <div className="flex gap-1">
                    {server.rate && (
                      <span className="flex items-center bg-brand-btn-gray-3 text-white text-xs font-medium h-6 px-2 rounded-md">
                        x{server.rate}
                      </span>
                    )}
                    {server.chronicle && (
                      <span className="flex items-center bg-brand-btn-gray-3 text-white text-xs font-medium h-6 px-2 rounded-md">
                        {server.chronicle.name}
                      </span>
                    )}
                  </div>
                </div>
                {server.short_description && (
                  <p className="text-[#848a99] text-xs line-clamp-1">
                    {server.short_description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-[#848a99] text-sm">{t("search_input_no_results")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
