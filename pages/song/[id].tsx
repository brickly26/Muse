import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const Song = () => {
  return (
    <div className="absolute w-full xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto" >
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            Song
          </div>
        </div>
      </div>
  )
}

export default Song