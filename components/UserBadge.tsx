import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import moment from 'moment'

import { IUser, Like } from "../types";
import FollowButton from "./FollowButton";
import useAuthStore from "../store/authStore";

interface IProps {
  user: IUser | any;
  location: string;
  post?: string | null;
  following?: boolean;
  date?: string;
}

const UserBadge = ({ user, location, post = null, following = false, date }: IProps) => {
  const { userProfile }: any = useAuthStore();

  if (location === "search") {
    return (
      <div className="flex items-center justify-between md:w-[500px] md:h-[200px] w-[250px] h-[75px]  mb-3 rounded bg-gray2">
        <div className="flex gap-2 h-full items-center">
          <div className="rounded-full md:w-[100px] w-[50px] md:m-5 ml-2">
            <Link href={`/profile/${user._id}`}>
              <div className="m-0 p-0">
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={user.image}
                  layout="responsive"
                  alt={user.userName}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={`/`}>
              <div className="flex flex-col justify-center gap-2">
                <p className="flex md:gap-2 md:text-2xl text-md items-center font-bold">
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
        {userProfile && (
          user._id !== userProfile._id && <FollowButton userId={user._id} following={following} location="search" />
        )}
      </div>
    );
  }

  if (location === "feed") {
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
                  layout="responsive"
                  alt={user.userName}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={`/`}>
              <div className="flex flex-col justify-center gap-2">
                <p className="flex gap-2 text-lg items-center font-bold">
                  {user.userName}
                  <GoVerified className="text-[#1FB954] text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {user.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <p className="text-md text-neutral-500 mt-3 ml-3">{`Liked this ${post} ${moment(date).fromNow()}`}</p>
      </div>
    );
  }

  if (location === "suggested") {
    return (
      <Link href={`/profile/${user._id}`}>
        <div className="block md:flex md:items-center md:justify-between mb-3 rounded bg-gray2">
          <div className="flex gap-2 items-center">
            <div className="flex items-center rounded-full w-12 h-12 m-3">
              <Image
                src={user.image}
                width={34}
                height={34}
                className="rounded-full"
                alt={user.userName}
                layout="responsive"
              />
            </div>
            <div className="hidden xl:block">
              <p className="flex gap-1 items-center text-md font-bold lowercase">
                {user.userName.replaceAll(" ", "")}
                <GoVerified className="text-[#1fb954]"/>
              </p>
              <p className="capitalize text-gray-500 text-xs">
                {user.userName}
              </p>
            </div>
          </div>
          {user._id !== userProfile._id && <FollowButton userId={user._id} following={following} location="suggested" />}
        </div>
      </Link>
    );
  }
  return <div>hello</div>;
};

export default UserBadge;
