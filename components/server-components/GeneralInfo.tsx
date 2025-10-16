import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Titlemini from './TitleMini'

const texts = [
  "Картельные сговоры не допускают ситуации, при которой предприниматели в сети интернет призывают нас к новым свершениям, которые, в свою очередь, должны быть объединены в целые кластеры себе подобных.",
  "Каждый из нас понимает очевидную вещь новая модель организационной деятельности обеспечивает широкому кругу (специалистов) участие в формировании как самодостаточных, так и внешне зависимых концептуальных решений!",
  "С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты системы обучения кадров, соответствующей насущным потребностям.",
  "Мы вынуждены отталкиваться от того, что высококачественный прототип будущего проекта требует от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Но независимые государства лишь добавляют фракционных разногласий и обнародованы.",
  "Имеется спорная точка зрения, гласящая примерно следующее: реплицированные с зарубежных источников, современные исследования, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Учитывая ключевые сценарии поведения, разбавленное изрядной долей эмпатии, рациональное мышление обеспечивает актуальность существующих финансовых и административных условий!",
  "Принимая во внимание показатели успешности, внедрение современных методик выявляет срочную потребность кластеризации усилий. Также как граница обучения кадров позволяет выполнить важные задания по разработке инновационных методов управления процессами."
]

const GeneralInfo = () => {
  return (
    <div className='py-6 px-3 lg:px-7'>
      <Tabs defaultValue="scryde" className="w-full">
        <TabsList className='justify-start flex-wrap gap-3 w-full'>
          <TabsTrigger className='bg-brand-gray-2 dark:bg-[#20232d] data-[state=active]:bg-brand-btn data-[state=active]:text-white h-9 border border-[#dde5eb] dark:border-[#2a2f3a] rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="scryde">www.scryde.com x500</TabsTrigger>
          <TabsTrigger className='bg-brand-gray-2 dark:bg-[#20232d] data-[state=active]:bg-brand-btn data-[state=active]:text-white h-9 border border-[#dde5eb] dark:border-[#2a2f3a] rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="scryde2">www.scryde.com x500</TabsTrigger>
          <TabsTrigger className='bg-brand-gray-2 dark:bg-[#20232d] data-[state=active]:bg-brand-btn data-[state=active]:text-white h-9 border border-[#dde5eb] dark:border-[#2a2f3a] rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="scryde3">www.scryde.com x500</TabsTrigger>
          <TabsTrigger className='bg-brand-gray-2 dark:bg-[#20232d] data-[state=active]:bg-brand-btn data-[state=active]:text-white h-9 border border-[#dde5eb] dark:border-[#2a2f3a] rounded-lg !shadow-none cursor-pointer font-bold dark:text-white' value="scryde4">www.scryde.com x500</TabsTrigger>
        </TabsList>
        <TabsContent value="scryde">
          <div className='flex flex-col lg:flex-row items-start gap-8 py-6'>
            <div className='md:max-w-[404px] w-full '>
              <Titlemini title='Основная информация' className='mb-5' />
              <div className='w-full space-y-2 pt-1'>
                <div className='flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3'>
                  <p className='text-sm text-[#5b646b] dark:text-[#797e8c] font-medium'>Открытие</p>
                  <p className='text-sm font-bold text-brand-primary dark:text-white'>20.09.2015</p>
                </div>
                <div className='flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3'>
                  <p className='text-sm text-[#5b646b] dark:text-[#797e8c] font-medium'>Хроники</p>
                  <p className='text-sm font-bold text-brand-primary dark:text-white'>Interlude</p>
                </div>
                <div className='flex items-center justify-between h-10 rounded-lg bg-brand-gray-2 dark:bg-[#20232d] px-3'>
                  <p className='text-sm text-[#5b646b] dark:text-[#797e8c] font-medium'>Рейты</p>
                  <p className='text-sm font-bold text-brand-primary dark:text-white'>x5.000</p>
                </div>
              </div>
            </div>
            <div className='flex-1 w-full'>
              <Titlemini title='Основная информация' className='mb-5' />
              {texts.map((item,idx) => (
                <p key={idx} className='text-sm font-medium text-brand-primary-3 dark:text-white mb-3'>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="scryde2">
        </TabsContent>
        <TabsContent value="scryde3">
        </TabsContent>
        <TabsContent value="scryde4">
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GeneralInfo