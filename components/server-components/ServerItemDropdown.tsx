"use client"
import React, { useState } from 'react'
import { ChaqmoqIcon, CrownIcon, FlagIcon } from "@/icons";
import { LuGift } from "react-icons/lu";
import { FaCheck, FaDollarSign } from "react-icons/fa";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import type { ServerItem } from '@/lib/mockServers';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { AuthRequiredDialog, VoteDialog, VoteSuccessDialog } from './CustomDiaolog';
import { useAuthStore } from '@/contexts/AuthStore';
import DateResponse from '../elements/DateResponse';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface props {
  topserver?: boolean;
  server: ServerItem;
  serverColor?: boolean;
}

const ServerItemDropdown = ({topserver = false, server, serverColor = false} : props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isflag,setIsFlag] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const route = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleVote = () => {
    if (!isVoted) {
      setIsVoted(true)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className={`${topserver ? 'bg-[linear-gradient(180deg,#f1a348,#e88646,#e37944,#e17144,#e17043)] text-white' : 'bg-white dark:bg-brand-btn-gray-3 shadow-lg dark:shadow-none text-brand-primary-3 dark:text-white'} rounded-lg focus-visible:outline-none flex items-center justify-between relative h-12 group px-2 md:px-3 py-2.5 transition-base flex-row w-full z-40`}
      >
        <div className="w-fit flex items-center gap-1.5 overflow-hidden">
          <span className="min-w-8">
          {topserver ? (
            <>{true ? <CrownIcon /> : <ChaqmoqIcon />}</>
          ) 
          : (
            <span className={`flex items-center justify-center ${serverColor ? 'bg-brand-btn' : 'bg-brand-primary-3'} text-white min-w-8 h-5 rounded-md text-xs font-extrabold`}>
              VIP
            </span>
          ) }
          </span>
          <span className="overflow-hidden text-sm md:text-base truncate text-ellipsis uppercase group-hover:underline group-focus:underline font-extrabold">
            {server.domain}
          </span>
          <div className="hidden flex-row items-center gap-1 text-orange-600 md:flex" />
        </div>
        <div className='flex flex-col 2xl:flex-row 2xl:items-center lg:!gap-2'>
          <div className='flex items-center gap-1 justify-end'>
            <div className={`flex items-center gap-1.5 ${topserver ? 'text-[#f8b464]' : serverColor ? 'text-brand-btn' : 'text-brand-primary-3'}`}>
              {server.icons && server.icons.length > 0 && (
                <>
                  {server.icons.map((icon) => {
                    if (icon === "gift") return (
                      <Tooltip key="gift">
                        <TooltipTrigger asChild>
                          <LuGift className="text-sm cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side='bottom' className='bg-black text-white text-xs font-bold'>
                          <p>Бонус старт</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                    if (icon === "verified") return (
                      <Tooltip key="verified">
                        <TooltipTrigger asChild>
                          <HiOutlineCheckBadge className="text-sm stroke-2 cursor-help" />
                        </TooltipTrigger>
                          <TooltipContent side='bottom' className='bg-black text-white text-xs font-bold'>
                           <p>Подтвержденный сервер</p>
                         </TooltipContent>
                      </Tooltip>
                    )
                    if (icon === "donate") return (
                      <Tooltip key="donate">
                        <TooltipTrigger asChild>
                          <FaDollarSign className="text-sm cursor-help" />
                        </TooltipTrigger>
                          <TooltipContent side='bottom' className='bg-black text-white text-xs font-bold'>
                           <p>Платный сервер</p>
                         </TooltipContent>
                      </Tooltip>
                    )
                    return null
                  })}
                </>
              )}
            </div>
            <div className="text-xs font-bold">{server.rate}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className="text-xs text-nowrap font-bold">{server.chronicle}</div>
            <DateResponse date={server.dateTime} color={true} topserver={topserver} />
          </div>
        </div>
      </button>
      
      {/* Accordion Content */}
      {isAccordionOpen && (
        <div className={` absolute top-full -translate-y-2 left-0 right-0 mt-1 bg-[#faf3ef] dark:bg-brand-main-dark rounded-lg rounded-t-none z-50 border border-t-0 border-brand-btn transition duration-500 py-3 pl-4 pr-2`}>
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold">
              <span className="block text-brand-primary-3 dark:text-white">
              позиция в рейтинге #1
              </span>
              <span className="text-brand-btn">(378 голосов)</span>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1">
              {isVoted ? (
                <div className="bg-brand-btn rounded-lg rounded-r-2xl h-8 flex items-center justify-between">
                  <span className="text-sm font-extrabold leading-4 text-white px-2.5">10:57:40</span>
                  <div className="flex items-center justify-center gap-2 bg-white border border-brand-btn h-8 w-8 rounded-lg">
                    <FaCheck className="text-sm text-brand-btn" />
                  </div>
                </div>
              ) :<Dialog>
                <DialogTrigger  className=' bg-brand-btn cursor-pointer hover:bg-brand-btn/90 text-white rounded-lg px-4 h-8 flex items-center justify-center gap-2 text-xs font-medium transition-colors relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10'>
                  ПРОГОЛОСОВАТЬ
                </DialogTrigger>
                {isAuthenticated ? !isSucces ? <VoteDialog handleClick={() => setIsSucces(true)} /> : <VoteSuccessDialog handleClick={handleVote} /> : <AuthRequiredDialog />}
              </Dialog>}
              <button onClick={() => route.push('/server-info')} className="px-3 h-8 bg-[#464b55] text-white text-xs font-bold rounded-md hover:bg-opacity-90 transition-colors">
              подробнее
              </button>
              <button onClick={() => setIsFlag(!isflag)} className={`size-8 flex items-center justify-center rounded-md bg-white dark:bg-transparent border ${isflag ? "border-brand-green" : "border-brand-btn"}`}>
                {!isflag ? <FlagIcon /> : <FaCheck className="text-sm text-brand-green" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServerItemDropdown