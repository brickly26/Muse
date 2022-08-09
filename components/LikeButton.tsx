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
  setAlreadyLiked: any
}

const LikeButton = ({ userId, post, alreadyLiked, setAlreadyLiked }: IProps) => {

  if(post.name === 'SadBoyProlific'){
    console.log('start', alreadyLiked)
  }

  const handleLike = async () => {
    console.log('inside1', alreadyLiked);

    // setAlreadyLiked((prev: any) => !prev);

    console.log('inside2', alreadyLiked)
    try {
      const response = await axios.put(`${BASE_URL}/api/like`, {
        userId: userId,
        post: post,
        like: alreadyLiked,
      }) 
    } catch (error) {
      // setAlreadyLiked((prev: any) => !prev);
    }
  }

  return (
    <>
      {alreadyLiked ? (
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-red text-yellow"
          onClick={handleLike}
        >
          <BsHeartFill />
        </div>
      ) : (
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]"
          onClick={handleLike}  
        >
          <BsHeartFill />
        </div>
      )}
    </>
  )
}

export default LikeButton