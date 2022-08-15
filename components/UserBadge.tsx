import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { IUser, Like } from "../types";

import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import useAuthStore from "../store/authStore";

interface IProps {
  user: IUser | any;
  location: string;
  post?: string | null;
  following?: boolean;
}

const UserBadge = ({ user, location, post = null, following = false }: IProps) => {
  const { userProfile }: any = useAuthStore();

  if (location === "search") {
    return (
      <div className="flex items-center justify-between lg:w-[500px] lg:h-[200px] w-[200px] h-[300px] md:h-[400px] mb-3 rounded bg-gray2">
        <div className="flex gap-2 h-full items-center">
          <div className="rounded-full lg:w-[100px] lg:h-[100px] m-5">
            <Link href={`/profile/${user._id}`}>
              <div className="m-0 p-0">
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
            <p className="text-sm text-neutral-500 mt-3">{`Liked this ${post} a few seconds ago`}</p>
          </div>
        </div>
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
                alt="user Profile"
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
  return <div>hellow</div>;
};

export default UserBadge;
