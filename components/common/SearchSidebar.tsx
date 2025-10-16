
import SearchInput from "../elements/SearchInput"
import MainButton from "../elements/MainButton"
import FilterButtons from "../elements/FilterButtons"
import CustomSelect from "../elements/CustomSelect"
import { TopIcon } from "@/icons"
import Image from "next/image"
import Link from "next/link"

const filterButtons = [
  { id: 'top', label: 'Топ сервера Lineage II', colSpan: 'col-span-2' },
  { id: 'interlude1', label: 'Interlude 1', colSpan: 'col-span-1' },
  { id: 'interlude2', label: 'Interlude 2', colSpan: 'col-span-1' },
  { id: 'interlude3', label: 'Interlude 3', colSpan: 'col-span-1' },
  { id: 'interlude4', label: 'Interlude 4', colSpan: 'col-span-1' },
  { id: 'interlude5', label: 'Interlude 5', colSpan: 'col-span-1' },
  { id: 'interlude6', label: 'Interlude 6', colSpan: 'col-span-1' },
]

const filterButtons2 = [
  { id: '1', label: 'Multi-Proffesional', colSpan: 'col-span-1 !text-xs' },
  { id: '2', label: 'Multi-Proffesional', colSpan: 'col-span-1 !text-xs' },
  { id: '3', label: 'PVE Сервера', colSpan: 'col-span-1' },
  { id: '4', label: 'PVE Сервера', colSpan: 'col-span-1' },
  { id: '5', label: 'PVE Сервера', colSpan: 'col-span-1' },
  { id: '6', label: 'PVE Сервера', colSpan: 'col-span-1' },
  { id: '7', label: 'PVE Сервера', colSpan: 'col-span-1' },
  { id: '8', label: 'PVE Сервера', colSpan: 'col-span-1' },
]

const filterButtons3 = [
  { id: '1', label: 'х750.000', colSpan: 'col-span-1' },
  { id: '2', label: 'х750.000', colSpan: 'col-span-1' },
  { id: '3', label: 'х750.000', colSpan: 'col-span-1' },
  { id: '4', label: 'х750.000', colSpan: 'col-span-1' },
  { id: '5', label: 'х750.000', colSpan: 'col-span-1' },
  { id: '6', label: 'х750.000', colSpan: 'col-span-1' },
]

const selectOptions = [
  'x1',
  'x5', 
  'x10',
  'x1000',
  'x10000',
  'x50000',
]

const selectOptions2 = [
  'Все хроники',
  'Classic', 
  'Essence',
  'High Five',
  'C4',
  'Final',
]

export const servers = [
  { rank: 1, name: 'L2 Cornelius x500', price: '1.800 mc' },
  { rank: 2, name: 'Lineage II x500', price: '1.800 mc' },
  { rank: 3, name: 'Lineage II x500', price: '1.800 mc' },
  { rank: 4, name: 'Lineage II x500', price: '1.800 mc' },
  { rank: 5, name: 'Lineage II x500', price: '1.800 mc' },
];

const SearchSidebar = () => {

  return (
    <aside className='hidden bg-brand-main lg:flex flex-col w-[316px] rounded-2xl rounded-r-none py-5'>
      <FilterContent />
    </aside>
  )
}

export const FilterContent = () => (
  <>
    {/* filter one part */}
    <div className="px-5">
      <SearchInput />
      <div className='grid grid-cols-2 gap-3.5 py-5 border-b border-brand-primary'>
        <FilterButtons btns={filterButtons} />
      </div>

      <div className='grid grid-cols-2 gap-x-3.5 gap-y-[18px] py-5'>
        {/* Custom Select */}
        <CustomSelect title="Все рейты" options={selectOptions} />
        <CustomSelect title="Все хроники" options={selectOptions2} />

        <MainButton className="col-span-2 tracking-[1px] !h-12 !px-0">
          ПОДОБРАТЬ СЕРВЕР
        </MainButton>
      </div>
    </div>

    
    <div className="hidden lg:inline-block bg-[#292c34] mb-5">
      <div className="p-5 rounded-xl w-full max-w-md">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <TopIcon />
          <h2 className="text-white font-bold uppercase tracking-[1px]">ТОП 5 СЕРВЕРОВ</h2>
        </div>

        {/* Server list */}
        <div className="flex flex-col gap-1.5">
          {servers.map((server) => {
            // Fon classi rank bo‘yicha
            const bgClass =
              server.rank === 1
                ? "overflow-hidden"
                : "bg-[#323741]";

            // Rank doira classi rank bo‘yicha
            const rankClass =
              server.rank === 1
                ? "bg-[#ea704e]"
                : server.rank === 2 || server.rank === 3
                ? "bg-[linear-gradient(180deg,#b8573c,#ac543c,#874c3e,#594140,#4f3f40)]"
                : "bg-[#414753]";

            return (
              <Link
                href={'/top-servers'}
                key={server.rank}
                className={`flex relative z-0 items-center bg-brand-secondary-3 justify-between rounded-xl pl-1.5 pr-3 h-[38px] hover:opacity-90 ${bgClass}`}
              >
                <div className={`flex items-center gap-3.5 z-20`}>
                  <span className={`w-7 h-7 flex items-center justify-center rounded-xl text-xs font-extrabold text-white ${rankClass}`}>
                  {server.rank}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {server.name}
                  </span>
                </div>

                <span className="text-sm text-brand-orange font-semibold z-20">
                  {server.price}
                </span>
                {/* Overlay for rank 1 */}
                {server.rank === 1 && (
                  <>
                    <div className="absolute size-full left-0 bg-[linear-gradient(135deg,#b8573c,#ac543c,#874c3e,#594140,#4f3f40)] opacity-80 z-10"></div>
                    <Image className="absolute object-cover size-full " src={'/fire.png'} fill alt="fire" />
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
        <Link href={'#'} className="relative w-[240px] h-[400px] rounded-lg overflow-hidden">
          <img 
            src={"https://l2topzone.com/facebook.png"} 
            alt="Баннер" 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>

    <div className="px-5">
      <div className='grid grid-cols-2 gap-3.5 py-5 border-y border-brand-primary'>
        <FilterButtons btns={filterButtons2} />
      </div>
      <div className='grid grid-cols-2 gap-3.5 py-5'>
        <FilterButtons btns={filterButtons3} />
      </div>
    </div>
  </>
)

export default SearchSidebar