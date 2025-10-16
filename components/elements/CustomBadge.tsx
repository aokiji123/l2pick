import React from 'react'
import { BsFillLightningFill } from 'react-icons/bs'
import { MdOutlineAccessTime } from 'react-icons/md'

interface props {
  launchDate: string
}

const CustomBadge = ({launchDate}: props) => {
  const launchDateObj = new Date(launchDate.split('.').reverse().join('-'))
  const isLaunched = launchDateObj <= new Date()
  
  return (
    <p className={`flex items-center gap-1 rounded-xl p-2 ${
      isLaunched 
        ? 'bg-brand-green text-white' 
        : 'bg-brand-btn text-white'
    }`}>
      {isLaunched ? <BsFillLightningFill /> : <MdOutlineAccessTime className="text-sm" />}
      <span className="text-sm font-bold leading-4">
        {isLaunched ? 'Запущен' : `Запуск ${launchDate}`}
      </span>
    </p>
  )
}

export default CustomBadge