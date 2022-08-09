import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { BsHeartFill } from 'react-icons/bs'

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
  alreadyPosted: string
}

const ArtistCard = ({ post, alreadyPosted }: IProps) => {
  const [error, setError] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  const checkIfUserLiked = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/user/${userProfile._id}`);

    if(!data[0].likes) {
      data[0]?.likes?.forEach((like: any) => {
        if (post._id === like._id) {
          setAlreadyLiked(true)
        }
      })
    }
  }

  useEffect(() => {
    if(alreadyPosted.length > 0) {
      checkIfUserLiked()
    }
  }, [])

  const profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

  return (
    <div className="lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
      <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
        <Image
          width={62}
          height={62}
          className="rounded-full"
          onError={() => setError(true)}
          src={!error ? post.image : profilePic}
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
              alreadyPosted={alreadyPosted}
              alreadyLiked={alreadyLiked}
              userId={userProfile._id}
              post={post}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
