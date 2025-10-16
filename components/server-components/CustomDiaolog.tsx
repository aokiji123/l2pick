import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaThumbsUp } from 'react-icons/fa'
import Link from 'next/link'
import MainButton from '../elements/MainButton'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/contexts/AuthStore'

interface props {
  handleClick?: () => void;
}

const CustomDiaolog = ({handleClick}: props) => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Dialog>
      <DialogTrigger  className='w-full bg-brand-btn cursor-pointer hover:bg-brand-btn/90 text-white rounded-lg px-4 h-10 flex items-center justify-center gap-2 text-xs font-medium transition-colors relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10'>
        <FaThumbsUp className="text-sm" />
        ПРОГОЛОСОВАТЬ
      </DialogTrigger>
      {isAuthenticated ? <VoteSuccessDialog handleClick={handleClick} /> : <AuthRequiredDialog />}
    </Dialog>
  )
}

export const AuthRequiredDialog = () => {
  const route = useRouter();
  return (
    <DialogContent className='bg-transparent border-none p-0'>
      <div className='flex items-center justify-center relative bg-white min-h-[299px] border-none rounded-3xl shadow-2xl '>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[96%] h-full bg-white rounded-2xl -z-50"></div>
        <DialogHeader className='flex flex-col items-center justify-center'>
          <DialogTitle>
            <svg width={31} height={41} viewBox="0 0 31 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width={31} height={41} fill="url(#pattern0_126_587)" />
              <defs>
                <pattern id="pattern0_126_587" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#image0_126_587" transform="scale(0.0322581 0.0243902)" />
                </pattern>
                <image id="image0_126_587" width={31} height={41} preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAApCAMAAAD6UwK7AAAAAXNSR0IB2cksfwAAATVQTFRF9WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU5ai8/TwAAAGd0Uk5TADSTz+nu6tKZOx62/8AmOftGJzLc6AJgcc3QdWZyyd0UqSE6Ewj6R+bYVkXZVedK8+Vc29TVvrLW2naipaajehj4/lgkMKu78PTv4Lx/w7V3iXgPB9+filRClu2tZA2VpwYWTrPiuBUAj9AAAAGOSURBVHicY2SAA0YQgFDfEYIwBhcjI7LST2jy/Ix/GJAB63sUeaFfDGiA/S2yvMgPdHlOxlcIefGv6NIMDDwvEPKSn8EUH8T978Ac4YdweYU3YBHR+xCdHCxgSuweTF75JVhA4g5EXpXxGYiSvgmTV38KImVuwKzWfAwi5a7B5LUfosrrPACRipdR5ZUu0Upe/y6IVLkAkze8DSLVzsH9JwAOl1MweXNQZLG+g/sPDwDKq4hBox6u9j+YZGJkPAAU0xc6jUuzGeNeRpcT+Iy3ZHQ7hk/emlH0Oz75n4weR/DJ2zJ6HULm2zM+v4nMV0GVd9zMwCD7Hqe80yYQ6b8Xl7zLBhAp8wGXvOt6EBm0C5f8D/+1DAwhjNtxus9rFQND+Fbc7vdZwcAQuRmnPCSFaDxBlkcOXwNwWEZtQoj4M5peR/BsHgAzrfBddoSIMGPMBgY8QIsxdj0+eTfGuHX45E0YGeLX4pYOWcAIyw3YgKrBfKB88ONr2KWFXOZB0nQy4/O/L1DlJGQZj4C0AQD31m72TkCHqgAAAABJRU5ErkJggg==" />
              </defs>
            </svg>
          </DialogTitle>
          <div className='text-center'>
            <DialogDescription className='md:text-lg font-bold text-[#26292f] leading-5'>
            Для голосования за сервер, необходимо <Link className='text-brand-btn' href={'3'}>авторизоваться</Link>
            </DialogDescription>
            <span className='text-sm leading-5'>Перейдите на страницу авторизации</span>
          </div>
          <div className='w-full flex items-center justify-center mt-5 px-4'>
            <MainButton onClick={() => route.push("/auth")} className='w-fit text-sm font-extrabold leading-4'>АВТОРИЗАЦИЯ</MainButton>
          </div>
        </DialogHeader>
      </div>
    </DialogContent>
  )
}

export const VoteSuccessDialog = ({handleClick}: {handleClick?: () => void}) => {
  return (
    <DialogContent className='bg-transparent border-none p-0'>
      <div className='flex items-center justify-center relative bg-white min-h-[299px] border-none rounded-3xl shadow-2xl '>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[96%] h-full bg-white rounded-2xl -z-50"></div>
        <DialogHeader className='flex flex-col items-center justify-center'>
          <DialogTitle>
            <svg width={37} height={37} viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width={37} height={37} fill="url(#pattern0_124_177)" />
              <defs>
                <pattern id="pattern0_124_177" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#image0_124_177" transform="scale(0.027027)" />
                </pattern>
                <image id="image0_124_177" width={37} height={37} preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAAXNSR0IB2cksfwAAASBQTFRF9WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU59WU56m9JEAAAAGB0Uk5TAFD/4m/PttQ3v5KoaJnnZzgb8SXOMDHk4HLIGvcVSYrA5qUq+QgM3D5MHeWpTbO3tawRbOz9xEZ30bAE6wXTAkKInX87vizjUZoPV1SPkBZ5eAlqh6O72ujp7/v24bJc8AR/zAAAAXpJREFUeJyF08svA0EcB/DfbLzfUmmXHkRoqdcBpYjGRoNGQ+Pov3NyQzQaNJqKhqTxOBEN5SBpvUJQ6s3sbred6szsHH6zj89+s/vbGQT5A+HxlXuFogq/AQo+9FTxJy5Fbzqq9B2XklcdJSj0ha8qlJTyZ76qSsq18pGrap6UqfqBq+Q+YHsPPGVQM3I+MV/VqSGGW54y3qnzD/CUSc0wXvFU/bU6i3GOMifSBw3yukjJuY0Ixf6plnOgjLIkqSypOA3hh0nVekpHYCWULcpA0EYo8YaBbEdZ1XnMioIO1I0Q/ArooPeQiaAHKQsTLNH2E7aCtML/zb6vmwVNsf49prJrypRwRFhoYFdTjp3mC2bWoKaGwiAwVa2mYHjbGWapkYxyhqQtBhoNZpS06QrS0Vgg0y/oi7BezLWRVbivEwGqGl8jlPnSvU5Vk35CuVc9fhqa8gGhPCszPgqaXsYFeZG6b0RhEbqseOcszYakMwtCCzCHz+aVm3+2LlT5/Jh8iQAAAABJRU5ErkJggg==" />
              </defs>
            </svg>
          </DialogTitle>
          <div className='text-center'>
            <DialogDescription className='md:text-lg font-bold text-[#26292f] leading-5'>
              Спасибо за то, что проголосовали за сервер <Link className='text-brand-btn' href={'3'}>StackGO</Link>
            </DialogDescription>
            <span className='text-sm leading-5'>Ваш голос успешно учтён</span>
          </div>
          <div className='w-full flex items-center justify-center mt-5 px-4'>
            <MainButton onClick={handleClick} className='w-fit text-sm font-extrabold leading-4'>ПЕРЕЙТИ К СПИСКУ СЕРВЕРОВ</MainButton>
          </div>
        </DialogHeader>
      </div>
    </DialogContent>
  )
}

export const VoteDialog = ({handleClick}: {handleClick?: () => void}) => {
  return (
    <DialogContent className='bg-transparent border-none p-0'>
      <div className='flex items-center justify-center w-full relative bg-white min-h-[299px] border-none rounded-3xl shadow-2xl px-8'>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[96%] h-full bg-white rounded-2xl -z-50"></div>
        <DialogHeader className='flex flex-col items-center justify-center w-full'>
          <DialogTitle>
            Вы собираетесь проголосовать за сервер <Link className='text-brand-btn' href={'3'}>StackGO</Link>
          </DialogTitle>
          <div className='text-center w-full mt-7 space-y-3'>
            <DialogDescription className='sr-only'></DialogDescription>
            <div className='flex items-center justify-between w-full h-11 px-5 rounded-xl border border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-sm text-[#26292f] dark:text-white font-medium'>
              <p>Ваш IP адрес</p>
              <p>192.168.0.0</p>
            </div>
            <div className='flex items-center justify-between w-full h-11 px-5 rounded-xl border border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-sm text-[#26292f] dark:text-white font-medium'>
              <p>Ваш E-mail</p>
              <p>google@google.com</p>
            </div>
          </div>
          <div className='w-full flex items-center justify-center mt-5'>
            <MainButton onClick={handleClick} className='w-full !max-w-full text-sm font-extrabold leading-4 relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10'>
              <FaThumbsUp className="mr-2" />
              ПРОГОЛОСОВАТЬ ЗА STACKGO
            </MainButton>
          </div>
        </DialogHeader>
      </div>
    </DialogContent>
  )
}

export default CustomDiaolog