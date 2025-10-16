import MenuSidebar from '@/components/common/MenuSidebar'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BannersItem from '@/components/elements/BannersItem'
import MobileMenu from '@/components/common/MobileMenu'

const Banners = () => {
  return (
    <>
      <MobileMenu />
      <div className='flex items-stretch min-h-screen'>
        <MenuSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none'>
          <Tabs defaultValue="klassicheskie" className="w-full">
            <TabsList className='justify-start flex-wrap gap-3 border-b border-brand-gray dark:border-[#1f222c] w-full py-4 px-8'>
              <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="klassicheskie">Классические</TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="niz-levo">Низ лево</TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="niz-pravo">Низ право</TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="verkh-levo">Верх лево</TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-brand-gray-2 dark:data-[state=active]:bg-brand-btn-gray-3 data-[state=active]:text-brand-btn h-9 rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="verkh-pravo">Верх право</TabsTrigger>
            </TabsList>
            <TabsContent value="klassicheskie">
              <BannersItem data={3} />
            </TabsContent>
            <TabsContent value="niz-levo">
              <BannersItem data={1} />
            </TabsContent>
            <TabsContent value="niz-pravo">
              <BannersItem data={3} />
            </TabsContent>
            <TabsContent value="verkh-levo">
              <BannersItem data={5} />
            </TabsContent>
            <TabsContent value="verkh-pravo">
              <BannersItem data={2} />
            </TabsContent>
          </Tabs>
        </div>
      </div> 
    </>
  )
}

export default Banners