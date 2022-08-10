import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsCircleFill, BsHeartFill } from 'react-icons/bs';

import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

interface IProps {
  alreadyLiked: boolean;
  post: {
    _id: string;
    type: string;
    name: string;
    image: string;
    by?: string[]
  };
}

const LikeButton = ({ alreadyLiked, post }: IProps) => {
  const [liked, setLiked] = useState(alreadyLiked);
  const [updatingPost, setUpdatingPost] = useState(post);
  const { userProfile, fetchUserLikes }: any = useAuthStore();

  const handleLike = async () => {
    const response = await axios.put(`${BASE_URL}/api/like`, {
      userId: userProfile?._id,
      post: updatingPost,
      like: liked,
    });

    if(!liked) {
      setLiked(true);
      setUpdatingPost(response.data);
    } else {
      setLiked(false);
      setUpdatingPost(post)
    }
    fetchUserLikes(userProfile._id)
  }

  return (
    <>
     {/* {alreadyLiked ? ( */}
      {true ? (
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