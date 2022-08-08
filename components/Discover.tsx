import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

import { genres } from '../utils/constants';

const Discover = () => { 
  const router = useRouter();
  const { genre } = router.query;

  const activeStyles = 'xl:border-2 hover:bg-gray2 xl:border-[#1FB954] xl:px-3 xl:py-2 py-1 pl-2 pr-2 rounded xl:rounded-full flex items-center justify-center cursor-pointer text-[#1FB954]'

  const normalStyles = 'xl:border-2 hover:bg-gray xl:border-gray3 xl:px-3 xl:py-2 py-1 pl-2 pr-2 rounded xl:rounded-full flex items-center justify-center cursor-pointer text-gray-300'

  return (
    <div className='xl:border-b-2 xl:border-gray3 pb-6'>
      <p className='text-gray-200 font-semibold m-3 mt-4 hidden xl:block'>
        Discover
      </p>
      <div className='flex xl:gap-3 gap-3 flex-wrap'>
        {genres.map((gen) => (
          <Link href={`/?genre=${gen.name}`} key={gen.name}>
            <div className={genre === gen.name ? activeStyles : normalStyles}>
              <span>
                {gen.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover