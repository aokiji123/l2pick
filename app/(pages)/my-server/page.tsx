import MenuSidebar from '@/components/common/MenuSidebar'
import MobileMenu from '@/components/common/MobileMenu'
import DateResponse from '@/components/elements/DateResponse'
import ServerActions from '@/components/server-components/ServerActions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Servers = () => {
  return (
    <>
      <MobileMenu />
      <div className='flex items-stretch min-h-screen'>
        <MenuSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none'>
          <div className='grid grid-cols-2 xl:grid-cols-5 items-start xl:h-full'>
            <div className='order-2 col-span-2 xl:col-span-3 border-t xl:border-t-0 xl:border-r border-brand-slate-gray/30 h-full py-7'>
              <h2 className='font-bold text-brand-primary dark:text-white mb-1 px-4 lg:px-7'>
              Добавление сервера
              </h2>

              <ServerActions />
            </div>
            <div className='order-1 xl:order-3 col-span-2 xl:col-span-2 py-7 px-4 md:p-7 min-w-[250px] w-full'>
              <div className='bg-brand-gray-3 dark:bg-[#20242c] rounded-2xl p-5 space-y-4'>
                <div className='flex items-center gap-2'>
                  <div className='size-8 rounded-full overflow-hidden relative'>
                    <Image src={'/avatar.png'} fill alt='avatar' />
                  </div>
                  <h3 className='font-extrabold text-brand-header-light dark:text-white'>Lineage 2 Scryde</h3>
                </div>

                <div className='divide-y divide-[#d9e2e9] dark:divide-[#2a2d38]'>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                      Позиция в рейтинге
                    </span>
                    <span className={`text-brand-primary dark:text-white font-bold truncate`}>
                      27
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                      Сервер ID 
                    </span>
                    <span className={`text-brand-primary dark:text-white font-bold truncate`}>
                      456789
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 py-2">
                    <span className="text-brand-header-light text-nowrap dark:text-brand-slate-gray text-sm font-medium">
                      API KEY
                    </span>
                    <span className={`text-brand-primary dark:text-white font-bold truncate max-w-1/2`}>
                      dchbdovlsdfjvblfbvlfdbvdfivbldfvblfdb
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                      Голоса
                    </span>
                    <span className={`text-brand-primary dark:text-white font-bold truncate`}>
                      53.000
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                    Сайт
                    </span>
                    <Link href={'#'} className={`text-brand-btn font-bold truncate`}>
                      www.scryde.com
                    </Link>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-brand-header-light dark:text-brand-slate-gray text-sm font-medium">
                    Открытие
                    </span>
                    <DateResponse date='2025-08-15' />
                  </div>
                </div>

                <button className='flex items-center justify-center bg-brand-green w-full h-8 text-white text-xs font-medium cursor-pointer rounded-xl'>
                  Промодерирован и активен
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Servers