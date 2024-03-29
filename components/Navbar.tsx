import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from 'next/router'
import { BiSearch } from "react-icons/bi";
import { googleLogout } from "@react-oauth/google";
import { FiLogOut } from "react-icons/fi";
import { GoogleLogin } from '@react-oauth/google';

import useAuthStore from "../store/authStore";
import Logo from "../utils/Muse.png";
import { IUser } from "../types";
import { createOrGetUser } from '../utils';

interface IProps  {
  setRender: (a: string) => void
}

const Navbar = ({ setRender }: IProps) => {
  const { userProfile, removeUser, addUser, removeUserLikes, fetchUserLikes, fetchUserFollowers, removeUserFollowers } = useAuthStore();
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])
  
  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    } 
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray3 pb-2 pt-4 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="Muse"
            layout="responsive"
          />
        </div>
      </Link>

      {user && (
        <div className="relative sm:w-[275px] md:w-[350px]">
          <form
            onSubmit={() => {}}
            className="static top-10 -left-20"
          >
            <input
              type="text"
              value={searchValue}
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-white text-black px-4 py-2 md:text-md font-medium border-2 border-white focus:outline-none focus:border-2 focus:border-gray3 rounded-full w-[150px] sm:w-[275px] md:w-[350px] md:top-0 bg-black"
            />
            <button
              onClick={handleSearch}
              className="absolute sm:right-5 right-3 top-3 border-l-2 border-gray-200 sm:pl-4 pl-2 text-xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
      )}
      

      {user ? (
        <div className="flex gap-5 md:gap-10">
          {user?.image && (
            <Link href={`/profile/${user?._id}`}>
              <div>
                <Image
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={user?.image}
                  alt="profile photo"
                />
              </div>
            </Link>
          )}
          <button
            type="button"
            className="px-2"
            onClick={() => {
              googleLogout();
              removeUser();
              removeUserLikes();
              removeUserFollowers();
              setRender('1');
              router.reload()
            }}
          >
            <FiLogOut color="#1fb954" fontSize={21} />
          </button>
        </div>
      ) : (
        <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser, fetchUserLikes, setRender, fetchUserFollowers, router)}
            onError={() => console.log('Error')}
        />
      )}
    </div>
  );
};

export default Navbar;
