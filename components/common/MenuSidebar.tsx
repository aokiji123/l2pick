"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaPowerOff } from "react-icons/fa"
import { GrServerCluster } from "react-icons/gr"
import { HiSpeakerphone } from "react-icons/hi"
import { IoSettings } from "react-icons/io5"
import { LuUserRound } from "react-icons/lu"


const menuItems = [
  {
    title: 'Профиль',
    icon: <LuUserRound className="text-lg font-bold stroke-3 !fill-transparent" />,
    href: '/profile'
  },
  {
    title: 'Мои сервера',
    icon: <GrServerCluster className=" font-bold" />,
    href: '/my-server'
  },
  {
    title: 'Баннера',
    icon: <HiSpeakerphone className="text-lg font-bold" />,
    href: '/banners'
  },
  {
    title: 'API',
    icon: <IoSettings className="text-lg font-bold" />,
    href: '/checking'
  },
  {
    title: 'Выйти',
    icon: <FaPowerOff className="text-lg font-bold" />,
    href: '/'
  }
]   

const MenuSidebar = () => {
 

  return (
    <aside className='hidden bg-brand-main lg:flex flex-col w-[267px] rounded-2xl rounded-r-none py-5'>
      <MenuContent />
    </aside>
  )
}

export const MenuContent = () => {
  const pathname = usePathname()
  return (
    <>
      {menuItems.map((item, idx) => {
        const isActive = pathname === item.href
        return (
          <Link 
            key={idx} 
            href={item.href} 
            className={`relative flex items-center gap-2.5 h-12 px-8 font-bold transition ${
              isActive 
                ? 'text-white bg-brand-btn-gray-3 [&>svg]:stroke-brand-btn [&>svg]:fill-brand-btn before:absolute before:h-full before:w-1 before:bg-brand-btn before:left-0' 
                : 'text-white hover:text-white hover:bg-brand-btn-gray-3'
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        )
      })}
    
    </>
  )
} 

export default MenuSidebar