import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { IUser, Like } from '../types';

import FollowButton from './FollowButton';
import LikeButton from './LikeButton';

interface IProps {
  user: IUser | any;
  location: string;
  post?: Like | null;
  following: boolean;
}

const UserBadge = ({ user, location, post = null, following }: IProps) => {

  if (location === 'search') {
    return (
      <div className="flex items-center justify-between lg:w-[500px] lg:h-[200px] w-[200px] h-[300px] md:h-[400px] mb-3 rounded bg-gray2">
        <div className="flex gap-2 h-full items-center">
          <div className="rounded-full lg:w-[100px] lg:h-[100px] m-5">
            <Link href={`/profile/${user._id}`}>
              <div className='m-0 p-0'>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={user.image}
                  layout="responsive"
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={`/`}>
              <div className="flex flex-col justify-center gap-2">
                <p className="flex gap-2 text-2xl items-center font-bold">
                  {user.userName}
                  <GoVerified className="text-[#1FB954] text-md" />
                </p>
                <p className="capitalize font-medium text-lg text-gray-500 hidden md:block">
                  {user.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        {true && (
            <FollowButton userId={user._id} following={following}  />
          )} 
      </div>
    )
  }

  if (location === 'feed') {
    return (
      <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${user._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={user.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link href={`/`}>
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 text-lg items-center font-bold">
                    {user.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {user.userName}
                  </p>
                </div>
              </Link>
              <p className="text-sm mt-3">{`Liked this ${post.type} a few seconds ago`}</p>
            </div>
          </div>
        </div>
    )
  }

  if (location === 'suggested') {
    return (
      <Link href={`/profile/${user._id}`}>
        <div className="flex gap-3 hover:bg-primary bg-gray2 mb-2 p-2 cursor-pointer font-semibold rounded">
          <div className="w-8 h-8">
            <Image 
              src={user.image}
              width={34}
              height={34}
              className="rounded-full"
              alt="user Profile"
              layout="responsive"
            />
          </div>
          <div className="hidden xl:block">
            <p className="flex gap-1 items-center text-md font-bold lowercase">
              {user.userName.replaceAll(' ', '')}
              <GoVerified />
            </p>
            <p className="capitalize text-gray-500 text-xs">
              {user.userName}
            </p>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div>
      hellow
    </div>
  )
}

export default UserBadge;