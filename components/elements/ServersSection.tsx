
import { IoRocketSharp } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import ServerItemDropdown from "../server-components/ServerItemDropdown";
import type { ServerItem } from "@/lib/mockServers";
import { openedServers, soonServers, todayServers, tomorrowServers } from "@/lib/mockServers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Section({
  title,
  subtitle,
  icon,
  vip,
  servers,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  vip?: boolean;
  servers?: ServerItem[];
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="flex items-center gap-1 text-brand-primary-3 dark:text-white font-bold text-lg">
          {icon}
          <span className="line-clamp-1 font-exo2">{title}</span>

          <span className="text-xs ml-1 mt-1 text-nowrap font-exo2">
            {subtitle}
          </span>
        </h3>
        {vip && (
          <span className="bg-brand-gray-2 dark:bg-[#13151d] font-exo2 text-sm text-nowrap flex items-center justify-center h-8 text-brand-btn font-extrabold px-3 rounded-md ">
            VIP сервера
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {servers?.map((server) => (
          <ServerItemDropdown key={server.id}
            topserver={Boolean(server.topserver)}
            serverColor={Boolean(server.serverColor)}
            server={server}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServersSection() {
  return (
    <>
      <Tabs defaultValue="soon" className="md:hidden w-full">
        <TabsContent value="soon">
          <Section 
            icon={<MdAccessTime className="text-brand-primary-3 dark:text-brand-btn" />}
            title="Скоро откроются"
            vip={true}
            servers={soonServers}
          />
        </TabsContent>
        <TabsContent value="opened">
          <Section
            icon={<IoRocketSharp className="text-brand-primary-3 dark:text-brand-btn" />}
            title="Уже открылись"
            vip={true}
            servers={openedServers}
          />
        </TabsContent>
        <TabsList className='bg-white dark:bg-brand-primary-3 h-14 grid grid-cols-2 fixed z-50 bottom-0 left-0 justify-start flex-wrap gap-3 w-full'>
          <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="soon">Открытие скоро</TabsTrigger>
          <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="opened">Уже открытые</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid md:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-5 gap-x-3.5 ">
        <Section title="Сегодня" subtitle="(26.07.2021 - Пятница)" servers={todayServers} />
        <Section title="Завтра" subtitle="(26.07.2021 - Пятница)" servers={tomorrowServers} />
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3.5 ">
        <Section 
          icon={<MdAccessTime className="text-brand-primary-3 dark:text-brand-btn" />}
          title="Скоро откроются"
          vip={true}
          servers={soonServers}
        />
        <Section
          icon={<IoRocketSharp className="text-brand-primary-3 dark:text-brand-btn" />}
          title="Уже открылись"
          vip={true}
          servers={openedServers}
        />
        <Section title="Сегодня" subtitle="(26.07.2021 - Пятница)" servers={todayServers} />
        <Section title="Завтра" subtitle="(26.07.2021 - Пятница)" servers={tomorrowServers} />
      </div>
    </>
  );
}
