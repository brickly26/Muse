import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import { BsHeartFill } from 'react-icons/bs';

interface IProps {
  userId: string;
  post: {
    _id: string;
    type: string;
    name: string;
    image: string;
  };
  alreadyLiked: boolean;
  alreadyPosted: string
}

const LikeButton = ({ userId, post, alreadyLiked, alreadyPosted }: IProps) => {

  console.log(alreadyPosted);

  const handleLike = async (like: boolean) => {
    const { data } = await axios.put(`${BASE_URL}/api/like`, {
      userId: userId,
      post: post,
      like: alreadyLiked,
      alreadyPosted: alreadyPosted
    })
  }

  return (
    <>
      {alreadyLiked ? (
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-red text-yellow"
          onClick={() => handleLike(false)}
        >
          <BsHeartFill />
        </div>
      ) : (
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]"
          onClick={() => handleLike(false)}  
        >
          <BsHeartFill />
        </div>
      )}
    </>
  )
}

export default LikeButton