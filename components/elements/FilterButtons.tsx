"use client"
import React, { useState } from 'react'

interface props {
  btns: {
    id: string;
    label: string;
    colSpan: string
  }[]
}

const FilterButtons = ({btns}: props) => {
  const [activeFilter, setActiveFilter] = useState<string>('');

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId)
  }

  return (
    <>
      {btns.map((button) => (
        <button
          key={button.id}
          onClick={() => handleFilterClick(button.id)}
          className={`${button.colSpan} cursor-pointer flex items-center justify-center bg-brand-btn-gray-3 text-white text-sm h-10 border  rounded-xl transition-all duration-200 ${
            activeFilter === button.id
              ? 'border-[#ee8b21]'
              : 'border-brand-btn-gray-3'
          }`}
        >
          {button.label}
        </button>
      ))}
    </>
  )
}

export default FilterButtons