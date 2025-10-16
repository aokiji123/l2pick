'use client'

import MobileFilterSidebar from '@/components/common/MobileFilterSidebar'
import SearchSidebar from '@/components/common/SearchSidebar'
import ServerCard from '@/components/elements/ServerCard'
import React from 'react'

// Mock data for servers
const mockServers = [
  {
    id: 1,
    title: 'LINEAGE 2 SCRYDENET',
    description: 'Interlude Cusom PvP Server x1000 MAX LEVEL 99 max enchant 65 buff slots unlimited Augment count unlimited Battle Pass System',
    tags: ['Interlude', 'PTS', 'GVE'],
    rating: 4,
    votes: 25750,
    comments: 6570,
    launchDate: '11.12.2025',
    image: '/banner.jpg',
    hasVoted: true,
    voteTimer: '10:57:40'
  },
  {
    id: 2,
    title: 'LINEAGE 2 SCRYDENET',
    description: 'Interlude Cusom PvP Server x1000 MAX LEVEL 99 max enchant 65 buff slots unlimited Augment count unlimited Battle Pass System',
    tags: ['Interlude', 'PTS', 'GVE'],
    rating: 4.5,
    votes: 25750,
    comments: 657,
    launchDate: '05.12.2025',
    image: '/banner.jpg',
    hasVoted: false
  },
  {
    id: 3,
    title: 'LINEAGE 2 SCRYDENET',
    description: 'Interlude Cusom PvP Server x1000 MAX LEVEL 99 max enchant 65 buff slots unlimited Augment count unlimited Battle Pass System',
    tags: ['Interlude', 'PTS', 'GVE'],
    rating: 2.5,
    votes: 25750,
    comments: 657,
    launchDate: '17.12.2025',
    image: '/banner.jpg',
    hasVoted: false
  },
  {
    id: 4,
    title: 'LINEAGE 2 SCRYDENET',
    description: 'Interlude Cusom PvP Server x1000 MAX LEVEL 99 max enchant 65 buff slots unlimited Augment count unlimited Battle Pass System',
    tags: ['Interlude', 'PTS', 'GVE'],
    rating: 3.5,
    votes: 25750,
    comments: 657,
    launchDate: '14.12.2025',
    image: '/banner.jpg',
    hasVoted: false
  },
  {
    id: 5,
    title: 'LINEAGE 2 SCRYDENET',
    description: 'Interlude Cusom PvP Server x1000 MAX LEVEL 99 max enchant 65 buff slots unlimited Augment count unlimited Battle Pass System',
    tags: ['Interlude', 'PTS', 'GVE'],
    rating: 5,
    votes: 25750,
    comments: 657,
    launchDate: '11.05.2025',
    image: '/banner.jpg',
    hasVoted: false
  }
]

const TopServers = () => {

  return (
    <>
      <MobileFilterSidebar />
      <div className='flex items-stretch min-h-screen'>
        <SearchSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4'>
          {/* Server List */}
          <div className="space-y-4">
            {mockServers.map((server) => (
              <ServerCard
                key={server.id}
                id={server.id}
                title={server.title}
                description={server.description}
                tags={server.tags}
                rating={server.rating}
                votes={server.votes}
                comments={server.comments}
                launchDate={server.launchDate}
                image={server.image}
                hasVoted={server.hasVoted}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TopServers