"use client";
import SearchInput from "../elements/SearchInput";
import MainButton from "../elements/MainButton";
import FilterButtons from "../elements/FilterButtons";
import CustomSelect from "../elements/CustomSelect";
import { TopIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useAdvertisementsBackground } from "@/lib/queries/useAdvertisements";
import { Url } from "next/dist/shared/lib/router/router";
import { useRates } from "@/lib/queries/useRates";
import { useChronicles } from "@/lib/queries/useChronicles";
import { useServers, useTop5Servers } from "@/lib/queries/useServers";

const SearchSidebar = () => {
  return (
    <aside className="hidden bg-brand-main lg:flex flex-col w-[316px] rounded-2xl rounded-r-none py-5">
      <FilterContent />
    </aside>
  );
};

export const FilterContent = () => {
  const {
    data: advertisementsBackground,
    isLoading: advertisementsBackgroundLoading,
  } = useAdvertisementsBackground();

  const { data: rates } = useRates();
  const { data: chronicles } = useChronicles();
  const { data: top5Servers } = useTop5Servers();
  const { data: servers } = useServers({ per_page: 6, sort: "rating" });

  return (
    <>
      <div className="px-5">
        <SearchInput />
        <div className="grid grid-cols-2 gap-3.5 py-5 border-b border-brand-primary">
          <button className="col-span-2 cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border border-brand-btn-gray-3 rounded-xl transition-all duration-200 hover:border-[#ee8b21]">
            Топ сервера Lineage II
          </button>
          <FilterButtons servers={servers?.data || []} colSpan="col-span-1" />
        </div>

        <div className="grid grid-cols-2 gap-x-3.5 gap-y-[18px] py-5">
          <CustomSelect
            title="Все рейты"
            options={rates?.data.map((rate) => rate.name) || []}
          />
          <CustomSelect
            title="Все хроники"
            options={chronicles?.data.map((chronicle) => chronicle.name) || []}
          />

          <MainButton className="col-span-2 tracking-[1px] !h-12 !px-0">
            ПОДОБРАТЬ СЕРВЕР
          </MainButton>
        </div>
      </div>

      <div className="hidden lg:inline-block bg-[#292c34] mb-5">
        <div className="p-5 rounded-xl w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TopIcon />
            <h2 className="text-white font-bold uppercase tracking-[1px]">
              ТОП 5 СЕРВЕРОВ
            </h2>
          </div>

          <div className="flex flex-col gap-1.5">
            {top5Servers?.data.map((server) => {
              const bgClass =
                server.id === 1 ? "overflow-hidden" : "bg-[#323741]";

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
                  className={`flex relative z-0 items-center bg-brand-secondary-3 justify-between rounded-xl pl-1.5 pr-3 h-[38px] hover:opacity-90 ${bgClass}`}
                >
                  <div className={`flex items-center gap-3.5 z-20`}>
                    <span
                      className={`w-7 h-7 flex items-center justify-center rounded-xl text-xs font-extrabold text-white ${rankClass}`}
                    >
                      {server.id}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {server.announce_name}
                    </span>
                  </div>

                  {/* <span className="text-sm text-brand-orange font-semibold z-20">
                    {server.price}
                  </span> */}
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

      <div className="mb-5 px-5">
        <div className="w-full flex items-center justify-center h-[475px] rounded-2xl bg-brand-main-2">
          {advertisementsBackgroundLoading ? (
            <div></div>
          ) : (
            <Link
              href={advertisementsBackground?.data[0].link as Url}
              className="relative w-[240px] h-[400px] rounded-lg overflow-hidden"
            >
              <img
                src={advertisementsBackground?.data[0].image}
                alt="Баннер"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="px-5">
        <div className="grid grid-cols-2 gap-3.5 py-5 border-y border-brand-primary">
          <FilterButtons
            chronicles={chronicles?.data || []}
            colSpan="col-span-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3.5 py-5">
          <FilterButtons rates={rates?.data || []} colSpan="col-span-1" />
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
