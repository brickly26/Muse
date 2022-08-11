import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsHeartFill } from 'react-icons/bs';
import { TbHeartOff, TbActivityHeartbeat } from 'react-icons/tb';

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
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true)

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
    setLoading(false)
    fetchUserLikes(userProfile._id)
  }



  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-neutral-600">
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-red text-yellow"
          onClick={handleLike}
        >
          <TbActivityHeartbeat className='text-[#1fb954]'/>
        </div>
      </div>
    ) : (
      !liked ? (
        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]">
          <div 
            className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-red text-yellow"
            onClick={handleLike}
          >
            <BsHeartFill />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-neutral-600">
          <div 
            className="flex justify-center items-center w-[30px] h-[30px] rounded-full"
            onClick={handleLike}
          >
            <TbHeartOff className='text-red-600'/>
          </div>
        </div>
      )
    )}
    </>
  )
}

export default LikeButton