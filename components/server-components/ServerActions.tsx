"use client"
import React from 'react'
import { useState } from 'react'
import CreateServer from '../elements/CreateServer'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import MainButton from '../elements/MainButton'
import { IoSearchSharp } from 'react-icons/io5'

  const servers = [
    {
      id: 1,
      siteUrl: 'https://gaming-server.com',
      openingDate: '15.11.2025',
      announcementName: 'Gaming Server',
      ratingName: 'Gaming World Server',
      serverType: 'PVP',
      assemblyType: 'Custom',
      rates: 'x10',
      shortDescription: 'Лучший игровой сервер для настоящих геймеров. Высокие рейты, дружелюбное сообщество.',
      fullDescription: 'Полное описание игрового сервера с уникальными возможностями...',
      members: 1250,
      avatar: '🎮'
    },
    {
      id: 2,
      siteUrl: 'https://tech-community.com',
      openingDate: '20.10.2025',
      announcementName: 'Tech Community',
      ratingName: 'Technology Hub',
      serverType: 'PVE',
      assemblyType: 'Custom',
      rates: 'x5',
      shortDescription: 'Сообщество разработчиков и технических специалистов. Обучение и развитие.',
      fullDescription: 'Технологическое сообщество для изучения новых технологий...',
      members: 890,
      avatar: '💻'
    },
    {
      id: 3,
      siteUrl: 'https://music-lovers.com',
      openingDate: '01.12.2025',
      announcementName: 'Music Lovers',
      ratingName: 'Music Paradise',
      serverType: 'Custom',
      assemblyType: 'Custom',
      rates: 'x15',
      shortDescription: 'Музыкальное сообщество для любителей всех жанров музыки.',
      fullDescription: 'Место для обсуждения музыки, обмена треками и концертов...',
      members: 567,
      avatar: '🎵'
    },
    {
      id: 4,
      siteUrl: 'https://gaming-server.com',
      openingDate: '15.11.2025',
      announcementName: 'Gaming Server',
      ratingName: 'Gaming World Server',
      serverType: 'PVP',
      assemblyType: 'PVP',
      rates: 'x10',
      shortDescription: 'Лучший игровой сервер для настоящих геймеров. Высокие рейты, дружелюбное сообщество.',
      fullDescription: 'Полное описание игрового сервера с уникальными возможностями...',
      members: 1250,
      avatar: '🎮'
    },
    {
      id: 5,
      siteUrl: 'https://tech-community.com',
      openingDate: '20.10.2025',
      announcementName: 'Tech Community',
      ratingName: 'Technology Hub',
      serverType: 'PVE',
      assemblyType: 'Custom',
      rates: 'x5',
      shortDescription: 'Сообщество разработчиков и технических специалистов. Обучение и развитие.',
      fullDescription: 'Технологическое сообщество для изучения новых технологий...',
      members: 890,
      avatar: '💻'
    },
    {
      id: 6,
      siteUrl: 'https://music-lovers.com',
      openingDate: '01.12.2025',
      announcementName: 'Music Lovers',
      ratingName: 'Music Paradise',
      serverType: 'Custom',
      assemblyType: 'Custom',
      rates: 'x15',
      shortDescription: 'Музыкальное сообщество для любителей всех жанров музыки.',
      fullDescription: 'Место для обсуждения музыки, обмена треками и концертов...',
      members: 567,
      avatar: '🎵'
    },
    {
      id: 7,
      siteUrl: 'https://music-lovers.com',
      openingDate: '01.12.2025',
      announcementName: 'Music Lovers',
      ratingName: 'Music Paradise',
      serverType: 'Custom',
      assemblyType: 'Custom',
      rates: 'x15',
      shortDescription: 'Музыкальное сообщество для любителей всех жанров музыки.',
      fullDescription: 'Место для обсуждения музыки, обмена треками и концертов...',
      members: 567,
      avatar: '🎵'
    }
  ];

const ServerActions = () => {
  const [currentView, setCurrentView] = useState('buttons'); // 'buttons', 'create', 'update'
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedServerIndex, setSelectedServerIndex] = useState<number | null>(null);

  const handleNewServer = () => {
    setCurrentView('create');
    setSelectedServer(null);
  };

  // TODO: implement sever type
  const handleServerSelect = (server: any) => {
    setSelectedServer(server);
    setCurrentView('update');
  };

  const handleBack = () => {
    setCurrentView('buttons');
    setSelectedServer(null);
  };

  const handleServerItemClick = (index: number) => {
    setSelectedServerIndex(index);
  };

  return (
    <>
      {currentView === 'buttons' && (
        <div className='px-4 lg:px-7 space-y-5'>
          <button onClick={handleNewServer} className="w-full bg-brand-btn cursor-pointer hover:bg-brand-btn/90 text-white rounded-xl px-4 h-12 flex items-center justify-center gap-2 text-sm font-extrabold transition-colors relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10 mt-6" type="button">
            ДОБАВИТЬ НОВЫЙ СЕРВЕР
          </button>
          <Dialog>
            <DialogTrigger  className='w-full bg-brand-primary cursor-pointer hover:bg-brand-primary/90 text-white rounded-xl px-4 h-12 flex items-center justify-center gap-2 text-sm font-extrabold transition-colors'>
              ЗАЯВИТЬ О ПРАВАХ НА СЕРВЕР
            </DialogTrigger>
            <DialogContent className='bg-transparent border-none p-0 mt-20 max-h-[664px] h-full'>
              <div className='flex flex-col items-center justify-center relative bg-white min-h-[299px] border-none rounded-3xl shadow-2xl '>
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[96%] h-full bg-white rounded-2xl -z-50"></div>
                <DialogHeader className='flex flex-col items-center justify-center'>
                  <DialogTitle className='text-lg font-bold text-[#26292f] leading-4'>
                    Хотите заявить о правах на сервер?
                  </DialogTitle>
                  <DialogDescription className='text-sm font-medium leading-4'>
                    Найдите в поиске нужный сервер и подтвердите
                  </DialogDescription>
                </DialogHeader>
                <div className='text-center mt-10 max-w-[507px] w-full'>
                  <div className='relative'>
                    <input
                      type="text"
                      className={`w-full h-11 px-5 rounded-xl border border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
                      placeholder="Введите название сервера"
                    />
                    <IoSearchSharp className='absolute text-brand-btn stroke-2 size-5 top-1/2 -translate-y-1/2 right-5' />
                  </div>

                  <div className='w-full flex flex-col gap-y-2 bg-[#eef0f3] mt-3.5 rounded-lg max-h-[338px] overflow-y-auto scroll-style p-[17px]'>
                    {servers.map((server, index) => (
                      <div
                        key={index}
                        className={`bg-white cursor-pointer rounded-lg min-h-11 h-full flex items-center justify-start px-5 ${selectedServerIndex === index ? 'ring-1 ring-brand-btn' : ''}`}
                        onClick={() => handleServerItemClick(index)}
                      >
                        <p className='text-xs font-bold'>{server.announcementName} crop {server.rates}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='w-full flex items-center justify-center mt-5 px-4'>
                  <MainButton 
                    onClick={() => {
                      if (selectedServerIndex !== null) {
                        handleServerSelect(servers[selectedServerIndex]);
                      }
                    }} 
                    className='w-fit text-sm font-extrabold leading-4'
                  >
                    ЗАЯВИТЬ О ПРАВАХ НА СЕРВЕР
                  </MainButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {(currentView === 'create' || currentView === 'update') && (
        <CreateServer 
          serverData={selectedServer}
          onBack={handleBack}
        />
      )}
    </>
  )
}

export default ServerActions