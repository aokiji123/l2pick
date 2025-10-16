"use client"
import React, { useState, useEffect } from 'react'
import { DownloadIcon } from '@/icons'
import MainButton from './MainButton'
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import { IoImageOutline } from 'react-icons/io5'
import { TbArrowBackUp } from "react-icons/tb";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

interface FormData {
  siteUrl: string
  openingDate: string
  announcementName: string
  ratingName: string
  serverType: string
  assemblyType: string
  rates: string
  shortDescription: string
  fullDescription: string
  logo: File | null
  banner: File | null
}

interface FormErrors {
  siteUrl?: string
  fullDescription?: string
  [key: string]: string | undefined
}

interface props {
  serverData?: Partial<FormData> | null;
  onBack?: () => void;
}



const CreateServer = ({ serverData = null, onBack }: props) => {
  const [formData, setFormData] = useState<FormData>({
    siteUrl: serverData?.siteUrl || '',
    openingDate: serverData?.openingDate || '09.10.2025',
    announcementName: serverData?.announcementName || '',
    ratingName: serverData?.ratingName || '',
    serverType: serverData?.serverType || 'PVE',
    assemblyType: serverData?.serverType || 'PVE',
    rates: serverData?.rates || '',
    shortDescription: serverData?.shortDescription || 'Мы вынуждены отталкиваться от того, что высококачественный прототип будущего проекта требует от нас анализа позиций, занимаемых участниками в отношении поставленных задач.',
    fullDescription: serverData?.fullDescription || '',
    logo: serverData?.logo || null,
    banner: serverData?.banner || null
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [bannerPreview, setBannerPreview] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN')
  const [selectedLanguage2, setSelectedLanguage2] = useState<string>('EN')
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const serverTypes = ['PTS', 'Java', 'PVE', 'PVP', 'PVE/PVP', 'Custom']

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('createServerForm')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(prev => ({ ...prev, ...parsedData }))
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('createServerForm', JSON.stringify(formData))
  }, [formData])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    // Soddalashtirilgan: faqat bo'sh inputlar uchun xato
    if (!formData.siteUrl.trim()) {
      newErrors.siteUrl = 'Введите символы от А до Я'
    }
    if (!formData.openingDate.trim()) {
      newErrors.openingDate = 'Введите символы от А до Я'
    }
    if (!formData.announcementName.trim()) {
      newErrors.announcementName = 'Введите символы от А до Я'
    }
    if (!formData.ratingName.trim()) {
      newErrors.ratingName = 'Введите символы от А до Я'
    }
    if (!formData.serverType.trim()) {
      newErrors.serverType = 'Введите символы от А до Я'
    }
    if (!formData.rates.trim()) {
      newErrors.rates = 'Введите символы от А до Я'
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Введите символы от А до Я'
    }
    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Введите символы от А до Я'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileUpload = (field: 'logo' | 'banner', file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    
    const reader = new FileReader()
    reader.onload = (e) => {
      if (field === 'logo') {
        setLogoPreview(e.target?.result as string)
      } else {
        setBannerPreview(e.target?.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileDelete = (field: 'logo' | 'banner') => {
    setFormData(prev => ({ ...prev, [field]: null }))
    if (field === 'logo') {
      setLogoPreview('')
    } else {
      setBannerPreview('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your API
      alert('Сервер успешно создан!')
    }
  }

  const languages = ['EN', 'RU', 'UZ', 'KZ', 'KG']

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Server Information Section */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 text-sm hover:opacity-90 transition-colors mb-4 pl-4 lg:pl-7"
        >
          <TbArrowBackUp />
          Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-brand-slate-gray/30 px-4 lg:px-7 pb-7">
          {/* Site URL */}
          <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Ссылка на сайт
            </label>
            <input
              type="text"
              value={formData.siteUrl}
              onChange={(e) => handleInputChange('siteUrl', e.target.value)}
              className={`w-full h-11 px-5 rounded-xl border ${
                errors.siteUrl 
                  ? 'border-brand-danger' 
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder="Ссылка на сайт"
            />
            {errors.siteUrl && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.siteUrl}</p>
            )}
          </div>

          {/* Opening Date */}
          <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Дата открытия
            </label>
            <div className="relative">
              {/* onChange={(e) => handleInputChange('openingDate', e.target.value)} */}
              <Input
                id="date"
                value={formData.openingDate}
                placeholder="9.8.2025"
                className="w-full !h-11 px-4 pr-12 rounded-xl border border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary !outline-none dark:placeholder:text-[#535967]"
                onChange={(e) => {
                  handleInputChange('openingDate', e.target.value)
                  const parts = e.target.value.split('.')
                  if (parts.length === 3) {
                    const [day, month, year] = parts
                    const date = new Date(Number(year), Number(month) - 1, Number(day))
                    if (isValidDate(date)) {
                      setDate(date)
                      setMonth(date)
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setOpen(true)
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5 dark:text-white" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date)
                      handleInputChange('openingDate', formatDate(date))
                      setOpen(false)
                    }}
                    className='dark:bg-brand-dark dark:text-white'
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Announcement Name */}
          <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Имя в анонсе
            </label>
            <input
              type="text"
              value={formData.announcementName}
              onChange={(e) => handleInputChange('announcementName', e.target.value)}
              className={`w-full h-11 px-4 pr-12 rounded-xl border ${
                errors.announcementName
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder='Имя в анонсе'
            />
            {errors.announcementName && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.announcementName}</p>
            )}
          </div>

          {/* Rating Name */}
          <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Имя в рейтинге / Странице сервера
            </label>
            <input
              type="text"
              value={formData.ratingName}
              onChange={(e) => handleInputChange('ratingName', e.target.value)}
              className={`w-full h-11 px-4 pr-12 rounded-xl border ${
                errors.ratingName
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder='Странице сервера'
            />
            {errors.ratingName && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.ratingName}</p>
            )}
          </div>

          {/* Server Type */}
          <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Тип сервера
            </label>
            {/* onChange={(e) => handleInputChange('serverType', e.target.value)} */}
            <Select onValueChange={(value) => handleInputChange('serverType', value)}>
              <SelectTrigger  className={`w-full !h-11 px-4 rounded-xl border ${
                errors.serverType
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-white shadow-2xl dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium !outline-none`}>
                <SelectValue className='placeholder:!text-brand-secondary dark:placeholder:text-[#535967]' placeholder="select" />
              </SelectTrigger>
              <SelectContent className='bg-white dark:bg-brand-primary dark:text-white !text-xs font-bold border-[#d7dfe4] dark:border-[#21252f]'>
                {serverTypes.map((type,idx) => (
                  <SelectItem key={idx} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serverType && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.serverType}</p>
            )}
          </div>

           {/* Тип сборки */}
           <div>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
            Тип сборки
            </label>
            {/* onChange={(e) => handleInputChange('serverType', e.target.value)} */}
            <Select onValueChange={(value) => handleInputChange('assemblyType', value)}>
              <SelectTrigger  className={`w-full !h-11 px-4 rounded-xl border ${
                errors.serverType
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-white shadow-2xl dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium !outline-none`}>
                <SelectValue className='placeholder:!text-brand-secondary dark:placeholder:text-[#535967]' placeholder="select" />
              </SelectTrigger>
              <SelectContent className='bg-white dark:bg-brand-primary dark:text-white !text-xs font-bold border-[#d7dfe4] dark:border-[#21252f]'>
                {serverTypes.map((type,idx) => (
                  <SelectItem key={idx} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serverType && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.serverType}</p>
            )}
          </div>

          {/* Rates */}
          <div className='col-span-2'>
            <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2.5">
              Рейты
            </label>
            <input
              type="text"
              value={formData.rates}
              onChange={(e) => handleInputChange('rates', e.target.value)}
              className={`w-full h-11 px-4 pr-12 rounded-xl border ${
                errors.rates
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder='Рейты'
            />
            {errors.rates && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.rates}</p>
            )}
          </div>
        </div>

        {/* Server Description Section */}
        <div className="space-y-6 px-4 lg:px-7 py-7 border-b border-brand-slate-gray/30">
          {/* Short Description */}
          <div>
            <div className="flex sm:items-center justify-between mb-6">
              <label className="block font-bold text-brand-primary dark:text-white">
                Краткое описание сервера
              </label>
              <div className='flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-6'>
                {/* Language Selector */}
                <div className="flex items-center gap-1.5">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLanguage(lang)}
                      className={`w-7 h-6 rounded-lg text-[10px] cursor-pointer hover:opacity-90 text-white font-bold transition-colors ${
                        selectedLanguage === lang
                          ? 'bg-brand-btn'
                          : 'bg-brand-primary dark:bg-brand-secondary-2 '
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#494f5e] w-[115px]">
                  {formData.shortDescription.length}/400 Символов
                </span>
              </div>
            </div>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              maxLength={400}
              rows={2}
              className={`w-full p-4 rounded-xl border scroll-style ${
                errors.shortDescription
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder="Введите краткое описание сервера"
            />
            {errors.shortDescription && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.shortDescription}</p>
            )}
          </div>

          {/* Full Description */}
          <div>
            <div className="flex sm:items-center justify-between mb-6">
              <label className="block font-bold text-brand-primary dark:text-white">
                Полное описание сервера
              </label>
              <div className='flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-6'>
                {/* Language Selector */}
                <div className="flex items-center gap-1.5">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLanguage2(lang)}
                      className={`w-7 h-6 rounded-lg text-[10px] cursor-pointer hover:opacity-90 text-white font-bold transition-colors ${
                        selectedLanguage2 === lang
                          ? 'bg-brand-btn'
                          : 'bg-brand-primary dark:bg-brand-secondary-2 '
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#494f5e] w-[115px]">
                  {formData.fullDescription.length}/400 Символов
                </span>
              </div>
            </div>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => handleInputChange('fullDescription', e.target.value)}
              maxLength={400}
              rows={6}
              className={`w-full p-4 rounded-xl border scroll-style ${
                errors.fullDescription
                  ? 'border-brand-danger'
                  : 'border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark'
              } text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
              placeholder="Введите полное описание сервера"
            />
            {errors.fullDescription && (
              <p className="text-brand-danger text-xs text-right font-medium mt-1.5">{errors.fullDescription}</p>
            )}
          </div>
        </div>

        {/* Logo Upload */}
        <div className='flex justify-between items-center px-4 lg:px-7 py-7 border-b border-brand-slate-gray/30'>
          <div className='text-brand-primary dark:text-white'>
            <label className="block font-bold mb-4">
              Логотип
            </label>
            <p className="text-xs font-medium mb-5">
              120x90 до 50к6 JPG, PNG, WEBP
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <label className="flex items-center justify-center bg-brand-btn text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-brand-btn/90 transition-colors">
                  <DownloadIcon />
                  <span className="ml-2 text-sm font-medium">Загрузить</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload('logo', file)
                    }}
                    className="hidden"
                  />
                </label>
                {formData.logo && (
                  <button
                    type="button"
                    onClick={() => handleFileDelete('logo')}
                    className="flex items-center justify-center cursor-pointer bg-brand-danger text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Удалить</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='w-[120px] h-[90px] overflow-hidden relative rounded-2xl border border-[#e8ebf1] dark:border-[#313541] bg-transparent flex items-center justify-center'>
            {logoPreview ? <Image
              src={logoPreview}
              alt='Logo preview'
              fill
              className='object-cover'
            /> : <IoImageOutline className='text-[#e8ebf1] dark:text-brand-btn-gray size-9' />}
          </div>
        </div>

        <div className='flex flex-col gap-7 px-4 lg:px-7 py-7 border-b border-brand-slate-gray/30'>
          <div className='text-brand-primary dark:text-white'>
            <label className="block font-bold mb-4">
              Баннер
            </label>
            <p className="text-xs font-medium mb-5">
              36x36 до 50к6 JPG, PNG, WEBP
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <label className="flex items-center justify-center bg-brand-btn text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-brand-btn/90 transition-colors">
                  <DownloadIcon />
                  <span className="ml-2 text-sm font-medium">Загрузить</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload('banner', file)
                    }}
                    className="hidden"
                  />
                </label>
                {formData.banner && (
                  <button
                    type="button"
                    onClick={() => handleFileDelete('banner')}
                    className="flex items-center justify-center cursor-pointer bg-brand-danger text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Удалить</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='w-full h-72 sm:h-[332px] overflow-hidden relative rounded-2xl border border-[#e8ebf1] dark:border-[#313541] bg-transparent flex items-center justify-center'>
            {bannerPreview ? <Image
              src={bannerPreview}
              alt='Logo preview'
              fill
              className='object-cover'
            /> : <IoImageOutline className='text-[#e8ebf1] dark:text-brand-btn-gray size-28' />}
          </div>
        </div>

        {/* Submit Button */}
        <div className='w-full px-4 lg:px-7 pt-7'>
          <MainButton className="w-full max-w-none before:absolute before:size-full before:bg-brand-btn before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10">
            Создать сервер
          </MainButton>
        </div>
      </form>
    </>
  )
}

export default CreateServer