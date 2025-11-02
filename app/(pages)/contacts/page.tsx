"use client";

import MobileFilterSidebar from '@/components/common/MobileFilterSidebar';
import SearchSidebar from '@/components/common/SearchSidebar';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <MobileFilterSidebar />
      <div className='flex items-stretch min-h-screen'>
        <SearchSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:py-4'>
          <div className='lg:px-4 py-4'>
            <h2 className='text-xl text-brand-primary-3 font-exo2 dark:text-white font-bold uppercase leading-7 mb-6'>{t('contacts_title')}</h2>
            <p className='text-sm text-brand-primary-3 dark:text-white font-medium'>
              {t('contacts_description')} <Link href={'/faqs'} className='text-brand-btn underline font-extrabold'>{t('contacts_faq')}</Link>
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-8'>
              <div className='flex items-center justify-between gap-2 h-[135px] bg-brand-gray-3 dark:bg-brand-primary-4 border border-brand-gray dark:border-brand-btn-gray px-4 rounded-2xl'>
                <div className='flex flex-col lg:flex-row items-center gap-4'>
                  <Image src="/telegram.png" alt="Left" width={58} height={58} />
                  <h3 className='font-extrabold lg:text-xl dark:text-white'>{t('contacts_telegram')}</h3>
                </div>
                <button className='text-brand-primary-3 bg-white dark:bg-brand-main-dark dark:text-white border border-brand-gray dark:border-brand-btn-gray h-11 flex items-center justify-center font-bold text-sm px-4 rounded-xl cursor-pointer'>
                  {t('contacts_go_to_chat')} <RiArrowDropRightLine />
                </button>
              </div>
              <div className='flex items-center justify-between gap-2 h-[135px] bg-brand-gray-3 dark:bg-brand-primary-4 border border-brand-gray dark:border-brand-btn-gray px-4 rounded-2xl'>
                <div className='flex flex-col lg:flex-row items-center gap-4'>
                  <Image src="/whatsapp.png" alt="Left" width={58} height={58} />
                  <h3 className='font-extrabold lg:text-xl dark:text-white'>{t('contacts_whatsapp')}</h3>
                </div>
                <button className='text-brand-primary-3 text-nowrap bg-white dark:bg-brand-main-dark dark:text-white border border-brand-gray dark:border-brand-btn-gray h-11 flex items-center justify-center font-bold text-sm px-4 rounded-xl cursor-pointer'>
                  {t('contacts_go_to_chat')} <RiArrowDropRightLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
