import React from "react";
import Link from 'next/link';
import Image from 'next/image';

import useAuthStore from "../store/authStore";
import LikeButton from './LikeButton'
import axios from "axios";
import { BASE_URL } from "../utils";

interface IProps {
  post: {
    _id: string;
    name: string;
    type: string;
    image: string;
  };
  alreadyLiked: boolean;
  location?: string;
}

const profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

const ArtistCard = ({ post, alreadyLiked, location }: IProps) => {
  const { userProfile }: any = useAuthStore();

  return (
    <div className={`lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] ${location==='profile' ? 'mb-0' : 'mb-10'} rounded cursor-pointer bg-gray2`}>
      <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
        <Image
          width={62}
          height={62}
          className="rounded-full"
          onError={() => console.log('1')}
          src={post.image}
          layout="responsive"
        />
      </div>
      <div className="flex m-6">
        <div className="flex-3">
          <p className="text-2xl text-white mb-3">{post.name}</p>
          <p className="text-lg text-gray-400 hover:underline">
            {post.type}
          </p>
        </div>
        <div className="flex justify-end mr-5 items-center flex-1">
          {userProfile && (
            <LikeButton
              alreadyLiked={alreadyLiked}
              post={post}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
