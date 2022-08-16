import React, { useState } from "react";
import Image from "next/image";
import Link from "next/Link";
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
  const [error, setError] = useState(false);
  const { userProfile } = useAuthStore();


  return (
    <div className={`flex items-center justify-between lg:w-[500px] lg:h-[150px] w-[200px] h-[300px] md:h-[400px] ${location==='profile' ? 'mb-0' : 'mb-10'} rounded bg-gray2`}>
      <div className="flex gap-2 h-full items-center">
        <Link href={`/song/${post.spotifyId}`}>
          <div className="rounded-md cursor-pointer lg:w-[100px] lg:h-[100px] mx-5">
            <Image
              width={62}
              height={62}
              className="rounded-md"
              onError={() => setError(true)}
              src={!error ? post.image : musicPic}
              layout="responsive"
            />
          </div>
        </Link>
        <Link href={`/song/${post.spotifyId}`}>
          <div className="flex cursor-pointer">
            <div className="flex-3">
              <p className="text-xl text-white mb-3">{post.name}</p>
              <p className="text-md text-gray-400 hover:underline">
                {post.by.length === 1
                  ? post.by[0]
                  : post?.by.toString().replaceAll(",", ", ")}
              </p>
            </div>
          </div>
        </Link>
      </div>
      {userProfile && (
        <div className="mr-10 pl-10">
          <LikeButton alreadyLiked={alreadyLiked} post={post} />
        </div>
      )}
    </div>
  );
};

export default SongCard;
