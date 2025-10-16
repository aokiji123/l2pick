import Image from 'next/image'
import React from 'react'

interface props {
  data: number //just 
}

const BannersItem = ({data}: props) => {
  return (
    <div className='flex flex-col gap-4 py-4 px-5'>
      {[...Array(data)].map((_,idx) => (
        <div key={idx} className='flex flex-col md:flex-row items-center md:items-stretch gap-5'>
          <div className='relative size-[166px] overflow-hidden rounded-2xl'>
            <Image src={'/banner.jpg'} fill alt='banner' />
          </div>
          <div className='flex-1 bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] rounded-xl px-5 py-4'>
            <p className=' text-[#646d78] text-xs font-medium leading-4 md:line-clamp-[8]'> 
              Only entrepreneurs on the Internet, who are a prime example of the continental European type of political culture, will be declared to be in violation of universal norms of ethics and morality! And also supporters of totalitarianism in science call us to new achievements, which, in turn, should be equally left to themselves. Given the key scenarios of behavior, the constant quantitative growth and the scope of our activity ensures the relevance of the training system, which corresponds to the urgent needs. It is difficult to say why the shareholders of the largest companies are calling us to new achievements, which, in turn, must be functionally divided into independent elements. There is a controversial view that goes something like this: the shareholders of the largest companies are only a method of political participation and are mixed with non-unique data to the point of complete unrecognizability, which increases their status of uselessness.
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BannersItem