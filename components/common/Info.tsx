"use client";

import React from 'react'
import { useTranslation } from '@/contexts/LanguageContext'

const Info = () => {
  const { t } = useTranslation();

  return (
    <div className='max-w-[1364px] dark:text-white mx-auto px-4 xl:px-2 my-14'>
      <h3 className='text-2xl leading-5 font-bold mb-4'>
        {t("info_title")}
      </h3>
      <p className='leading-5'>
        {t("info_description")}
      </p>
    </div>
  )
}

export default Info