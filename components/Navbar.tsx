import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';

import Logo from '../utils/muse.png'
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray3 pb-2 pt-4 px-4'>
      <Link href='/' >
        <div className='w-[100px] md:w-[130px]'>
          <Image 
            className='cursor-pointer'
            src={Logo}
            alt="Muse"
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={() => {}}
          className="absolute md:static top-10 -left-20"
        >
          <input 
            type="text"
            value=''
            placeholder='Search...'
            onChange={() => {}}
            className='bg-white px-4 py-2 md:text-md font-medium border-2 border-white focus:outline-none focus:border-2 focus:border-gray3 rounded-full md:top-0 bg-black'
          />
          <button
            onClick={() => {}}
            className='absolute md:right-5 right-6 top-3 border-l-2 border-gray-200 pl-4 text-xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      
      <button
        className=''
        onClick={() => setIsShowLogin(true)}
      >
        Login section
      </button>
      {isShowLogin && (<LoginModal onClose={() => setIsShowLogin(false)}/>)}
    </div>
  );
}

export default Navbar;