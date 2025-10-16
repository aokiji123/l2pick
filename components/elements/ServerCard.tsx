'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaThumbsUp, FaCheck } from 'react-icons/fa'
import { CommentIcon, FlagIcon } from '@/icons'
import Link from 'next/link'
import { renderStars } from './RenderStars'
import CustomBadge from './CustomBadge'
import CustomDiaolog from '../server-components/CustomDiaolog'

interface ServerCardProps {
  id: number
  title: string
  description: string
  tags: string[]
  rating: number
  votes: number
  comments: number
  launchDate: string
  image: string
  hasVoted?: boolean
  voteTimer?: string
}

const ServerCard: React.FC<ServerCardProps> = ({
  id,
  title,
  description,
  tags,
  rating,
  votes,
  comments,
  launchDate,
  image,
  hasVoted = false
}) => {
  const [isVoted, setIsVoted] = useState(hasVoted)

  const handleVote = () => {
    if (!isVoted) {
      setIsVoted(true)
    }
  }

  const rankClass =
        id === 1
          ? "bg-[linear-gradient(0deg,#f5a339_0%,#f56539_100%)] relative before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-0 before:blur-md before:opacity-60 before:-z-10"
          : id === 2
          ? "bg-[linear-gradient(0deg,#f5a339_0%,#f56539_100%)]"
          : id === 3 ? "bg-[#f57239]"
          : "bg-[#414753]";

  return (
    <div className="relative bg-brand-gray-2 dark:bg-brand-primary-4 rounded-2xl border border-[#e6e9ec] dark:border-brand-primary-4 p-3">
      {/* Entry Number */}
      <div className="absolute top-5 sm:top-1 sm:left-1 z-10">
        <div className={`size-9 ${rankClass} rounded-xl flex items-center justify-center`}>
          <span className="text-white text-sm font-extrabold">{id}</span>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-3 sm:gap-1">
        <div className='flex flex-col md:flex-row justify-center flex-1 items-stretch gap-4'>
          {/* Thumbnail Image */}
          <div className="relative w-[148px] mx-auto sm:mx-0 h-[98px] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-extrabold leading-4 text-brand-primary-3 dark:text-white mb-3">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#4f5961] leading-4 dark:text-[#969ca9] mb-2.5 line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-md text-xs leading-4 font-bold ${
                    index === 0 
                      ? 'bg-brand-btn text-white' 
                      : 'bg-brand-btn-gray-3 text-white'
                  }`}
                >
                  {tag}
                </span>
              ))}
              <span className={`px-2 py-1 rounded-md text-xs leading-4 font-bold dark:text-white bg-white dark:bg-brand-dark border border-[#e6e9ec] dark:border-[#2c303c]`}>
                x1000
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full sm:w-1/3 justify-end gap-1 ">
          <CustomBadge launchDate={launchDate} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='flex flex-col gap-3 mt-3 xl:hidden'>
        {/* Rating and Stats */}
        <div className='flex items-center justify-between w-full h-10 rounded-lg bg-white dark:bg-[#2a2e3a] border border-[#e6e9ec] dark:border-[#2a2e3a] px-3'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {renderStars({ rating })}
            </div>
            <span className="text-xs font-bold text-brand-primary dark:text-[#84889a]">
              Голосов: <span className='text-brand-btn'>{votes.toLocaleString()}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <CommentIcon />
            <span className="text-xs text-brand-btn font-extrabold">
              {comments.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Vote Button */}
        <div className='w-full'>
          {isVoted ? (
            <div className="bg-brand-btn rounded-lg rounded-r-2xl h-10 flex items-center justify-between">
              <span className="text-sm font-extrabold leading-4 text-white px-2.5">10:57:40</span>
              <div className="flex items-center justify-end gap-2 text-white bg-brand-primary h-full rounded-lg px-4">
                <FaCheck className="text-sm text-brand-btn" />
                <span className="text-xs leading-4 font-extrabold">ГОЛОС УЧТЁН</span>
              </div>
            </div>
          ) : (
            <CustomDiaolog handleClick={handleVote} />
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row items-center gap-2'>
          <Link href={'/server-info'} className='flex-1 w-full min-h-10 flex items-center justify-center text-xs font-extrabold hover:opacity-90 py-2 text-brand-btn bg-white dark:bg-[#2b2e3a] border border-[#e6e9ec] dark:border-[#2b2e3a] rounded-lg'>
            ПЕРЕЙТИ НА САЙТ ›
          </Link>
          <div className='flex-1 flex items-center gap-2 w-full'>
            <button className="size-10 cursor-pointer flex items-center justify-center rounded-lg bg-white dark:bg-transparent border border-brand-btn">
              <FlagIcon />
            </button>   
            <button className='flex-1 h-10 cursor-pointer bg-white dark:bg-[#2b2e3a] border border-[#e6e9ec] dark:border-[#2b2e3a] text-xs font-extrabold leading-4 text-brand-primary dark:text-white px-3 rounded-lg'>
              Подробнее
            </button>  
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden xl:flex items-center flex-wrap gap-2.5 mt-3'>
        <div className='flex-1 flex items-center justify-between w-full h-10 rounded-lg bg-white dark:bg-[#2a2e3a] border border-[#e6e9ec] dark:border-[#2a2e3a]'>
          <div className='flex items-center pl-4'>
            {renderStars({ rating })}
            <span className="text-xs font-bold text-brand-primary dark:text-[#84889a] px-2.5 border-r border-[#e6e9ec]">
              Голосов: <span className='text-brand-btn'>{votes.toLocaleString()}</span>
            </span>
            <div className="flex items-center gap-1.5 pl-3">
              <CommentIcon />
              <span className="text-xs text-brand-btn font-extrabold">
                {comments.toLocaleString()}
              </span>
            </div>
          </div>
          <div className='flex items-center'>
            <div className="">
              {isVoted ? (
                <div className="bg-brand-btn rounded-lg rounded-r-2xl h-10 flex items-center justify-between">
                  <span className="text-sm font-extrabold leading-4 text-white px-3.5">10:57:40</span>
                  <div className="flex items-center gap-2 text-white bg-brand-primary h-full rounded-lg px-4">
                    <FaCheck className="text-sm text-brand-btn" />
                    <span className="text-xs leading-4 font-extrabold whitespace-nowrap">ГОЛОС УЧТЁН</span>
                  </div>
                </div>
              ) : (
                <CustomDiaolog handleClick={handleVote} />
              )}
            </div>
            <Link href={'/server-info'} className='flex items-center whitespace-nowrap text-xs font-extrabold hover:opacity-90 px-3 text-brand-btn' >
              ПЕРЕЙТИ НА САЙТ ›
            </Link>
          </div>
        </div>
        <button className="size-10 cursor-pointer flex items-center justify-center rounded-lg bg-white dark:bg-transparent border border-brand-btn">
          <FlagIcon />
        </button>   
        <button className='h-10 cursor-pointer bg-white dark:bg-[#2b2e3a] border border-[#e6e9ec] dark:border-[#2b2e3a] text-xs font-extrabold leading-4 text-brand-primary dark:text-white px-5 rounded-lg'>
          Подробнее о сервере
        </button>  
      </div>
    </div>
  )
}

export default ServerCard