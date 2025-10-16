"use client"
import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import { IoSearch } from 'react-icons/io5'

// Mock server data
const mockServers = [
  {
    id: 1,
    name: 'L2Mad.ws',
    tags: ['mid-rate', 'interlude', 'active'],
  },
  {
    id: 2,
    name: 'L2Dragon.net',
    tags: ['high-rate', 'gracia', 'pvp'],
  },
  {
    id: 3,
    name: 'L2Reborn.com',
    tags: ['low-rate', 'classic', 'hardcore'],
  },
  {
    id: 4,
    name: 'L2Madness.ru',
    tags: ['mid-rate', 'freya', 'russian'],
  },
  {
    id: 5,
    name: 'L2World.eu',
    tags: ['high-rate', 'interlude', 'europe'],
  },
  {
    id: 6,
    name: 'L2Legacy.us',
    tags: ['low-rate', 'interlude', 'english'],
  },
  {
    id: 7,
    name: 'L2Prime.net',
    tags: ['mid-rate', 'gracia', 'balanced'],
  },
  {
    id: 8,
    name: 'L2Elite.com',
    tags: ['high-rate', 'freya', 'elite'],
  }
]

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredServers, setFilteredServers] = useState<typeof mockServers>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [selectedServer, setSelectedServer] = useState<typeof mockServers[0] | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)


  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    
    if (value.length >= 2) {
      const filtered = mockServers.filter(server =>
        server.name.toLowerCase().includes(value.toLowerCase()) ||
        server.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      )
      setFilteredServers(filtered)
      setShowDropdown(true)
    } else {
      setFilteredServers([])
      setShowDropdown(false)
    }
  }

  const handleServerSelect = (server: typeof mockServers[0]) => {
    setSelectedServer(server)
    setSearchValue(server.name)
    setShowDropdown(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className='relative lg:static'>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {/* input */}
      <div className='bg-brand-primary-2 relative w-full h-12 overflow-hidden rounded-xl'>
        <input 
          ref={inputRef}
          className='absolute w-full h-full outline-none text-white placeholder:text-[#848a99] text-base tracking-[1px] pl-4 pr-12' 
          type='text' 
          placeholder='Поиск по серверам'
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <span className='block absolute top-1/2 right-4 -translate-y-1/2 z-10'>
          <IoSearch className='text-brand-btn text-xl' />
        </span>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className='absolute max-w-2xl z-50 w-full mt-1 bg-brand-primary-2 rounded-xl border border-brand-primary max-h-64 overflow-y-auto'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {filteredServers.length > 0 ? (
            filteredServers.map((server) => (
              <div
                key={server.id}
                className='p-3 hover:bg-brand-primary cursor-pointer border-b border-brand-primary last:border-b-0'
                onClick={() => handleServerSelect(server)}
              >
                <div className='flex items-center gap-3 mb-1'>
                  <h4 className='text-white font-medium text-sm'>{server.name}</h4>
                  <div className='flex gap-1'>
                    {server.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className='flex items-center bg-brand-btn-gray-3 text-white text-xs font-medium h-6 px-2 rounded-md'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='p-4 text-center'>
              <p className='text-[#848a99] text-sm'>Серверы не найдены</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInput