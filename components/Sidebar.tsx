import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ImCancelCircle } from 'react-icons/im'
import { AiOutlineMenu, AiFillHome } from 'react-icons/ai';

import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const { pathname } = useRouter()

  const activeStyles = 'flex item-center gap-3 hover:bg-gray2 p-3 justify-start  cursor-pointer font-semibold text-[#1FB954] rounded'

  const normalStyles = 'flex item-center gap-3 hover:bg-gray2 p-3 justify-start cursor-pointer font-semibold text-gray3 rounded'

  return (
    <div>
      <p
        className='inline-block lg:hidden m-2 ml-4 mt-3 text-2xl text-gray3 cursor-pointer'   
        onClick={() => {setShowSideBar((prev) => !prev)}}   
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </p>
      {showSideBar && (
        <div className='lg:w-400 w-28 pl-3 flex flex-col justify-start mb-10 border-r-2 border-gray3 lg:border-0 py-3'>
          <div className='lg:border-b-2 border-gray3 lg:pb-4'>
            <Link href='/' >
              <div className={pathname === '/' ? activeStyles : normalStyles}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden lg:block'>
                  Home
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Sidebar;