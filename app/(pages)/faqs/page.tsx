import MobileFilterSidebar from '@/components/common/MobileFilterSidebar';
import SearchSidebar from '@/components/common/SearchSidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDownIcon } from 'lucide-react';

export default function Faqs() {
  return (
    <>
      <MobileFilterSidebar />
      <div className='flex items-stretch min-h-screen'>
        <SearchSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4'>
          <div className='lg:px-4 py-4'>
            <h2 className='text-xl text-brand-primary-3 font-exo2 dark:text-white font-bold uppercase leading-7 mb-7'>часто задаваемые вопросы</h2>
            <div className='fle flex-col gap-3.5 w-full'>
              <Accordion type="single" collapsible className='space-y-3.5'>
                {[...Array(5)].map((item,idx) => (
                  <AccordionItem className='border-b-0' value={`item-${idx}`} key={idx}>
                    <AccordionTrigger className='bg-white dark:bg-brand-btn-gray-3 shadow-lg dark:shadow-none rounded-xl focus-visible:outline-none flex overflow-hidden md:overflow-visible relative text-brand-primary-3 dark:text-white  max-w-full !gap-1 md:!gap-2 h-12 items-center group px-2 md:px-3 py-2.5 transition-base flex-row'>
                      Как добавить сервер на сайт?
                      <span className='flex items-center justify-center size-7 rounded-lg bg-[#f0f4f4] dark:bg-brand-primary-3'>
                        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className='bg-[#eff2f3] dark:bg-brand-primary-3 rounded-b-xl rounded-t-none py-8 px-6 space-y-3'>
                      <p className='text-sm text-brand-primary-3 dark:text-[#b0b4bd]'>
                        Мы вынуждены отталкиваться от того, что высококачественный прототип будущего проекта требует от нас анализа позиций, занимаемых
                        участниками в отношении поставленных задач. Но независимые государства лишь добавляют фракционных разногласий и
                        обнародованы.
                      </p>
                      <p className='text-sm text-brand-primary-3 dark:text-[#b0b4bd]'>
                        Имеется спорная точка зрения, гласящая примерно следующее: реплицированные с зарубежных источников, современные исследования,
                        которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены
                        соответствующими инстанциями. Учитывая ключевые сценарии поведения, разбавленное изрядной долей эмпатии, рациональное
                        мышление обеспечивает актуальность существующих финансовых и административных условий!
                      </p>
                      <p className='text-sm text-brand-primary-3 dark:text-[#b0b4bd]'>
                        Принимая во внимание показатели успешности, внедрение современных методик выявляет срочную потребность кластеризации усилий.
                        Также как граница обучения кадров позволяет выполнить важные задания разработке инновационных методов управления процессами.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
