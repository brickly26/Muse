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
      <div className={`lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] ${location==='profile' ? 'mb-0' : 'mb-10'} rounded cursor-pointer bg-gray2`}>
        <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
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
        <div className="flex m-6">
          <div className="flex-3">
            <p className="text-2xl text-white mb-3">{post.name}</p>
            <p className="text-lg text-gray-400 hover:underline">
              {post.by.map((artist) => `${artist}, `)}
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
