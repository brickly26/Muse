import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import useAuthStore from "../store/authStore";
import LikeButton from "./LikeButton";

interface IProps {
  post: {
    _id: string;
    name: string;
    type: string;
    image: string;
    by: string[];
    spotifyId: string;
  };
  alreadyLiked: boolean;
  location: string;
}

const SongCard = ({ post, alreadyLiked, location }: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className={`flex items-center justify-between md:w-[500px] md:h-[150px] w-[250px] h-[80px] ${location==='profile' ? 'mb-0' : 'mb-10'} rounded bg-gray2`}>
      <div className="flex gap-3 h-full items-center">
        <Link href={`/song/${post.spotifyId}`}>
          <div className="rounded-md cursor-pointer w-[50px] md:w-[100px] md:mx-5 ml-2">
            <Image
              width={62}
              height={62}
              className="rounded-md"
              src={post.image}
              layout="responsive"
              alt={post.name}
            />
          </div>
        </Link>
        <Link href={`/song/${post.spotifyId}`}>
          <div className="flex cursor-pointer">
            <div className="flex-3">
              <p className="md:text-xl text-white md:mb-3">{post.name}</p>
              <p className="md:text-lg hidden md:block text-gray-400 hover:underline">
                {post.by.length === 1
                  ? post.by[0]
                  : post?.by.toString().replaceAll(",", ", ")}
              </p>
            </div>
          </div>
        </Link>
      </div>
      {userProfile && (
        <div className="lg:mr-10 lg:pl-10 mr-5">
          <LikeButton alreadyLiked={alreadyLiked} post={post} />
        </div>
      )}
    </div>
  );
};

export default SongCard;
