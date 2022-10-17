import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import LikeButton from "./LikeButton";
import useAuthStore from "../store/authStore";

interface IProps {
  post: {
    _id: string;
    image: string;
    name: string;
    by: string[];
    spotifyId: string;
  };
  alreadyLiked: boolean;
  location?: string;
}

const AlbumCard = ({ post, alreadyLiked, location }: IProps) => {
  const [error, setError] = useState(false);
  const { userProfile } = useAuthStore();
  

  return (
    <Link href={`/album/${post.spotifyId}`}>
      <div className={`md:w-[500px] w-[250px] ${location==='profile' ? 'mb-0' : 'mb-10'} rounded cursor-pointer bg-gray2`}>
        <div className="rounded-md w-[225px] md:w-[450px] md:mt-6 mt-3 m-auto">
          <Image
            width={62}
            height={62}
            className="rounded-md"
            onError={() => setError(true)}
            src={!error ? post.image : musicPic}
            layout="responsive"
            alt={post.name}
          />
        </div>
        <div className="flex md:m-6 my-3 ml-3">
          <div className="flex-3">
            <p className="text-2xl text-white md:mb-3">{post.name}</p>
            <p className="text-lg hidden md:block text-gray-400 hover:underline">
              {post.by.length === 1
                  ? post.by[0]
                  : post?.by.toString().replaceAll(",", ", ")}
            </p>
          </div>
          {userProfile && (
            <div className="flex justify-end mr-5 items-center flex-1">
              <LikeButton alreadyLiked={alreadyLiked} post={post} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
