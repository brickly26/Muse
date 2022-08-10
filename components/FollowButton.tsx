import React, { useState } from 'react'
import axios from 'axios';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

interface IProps {
  following: boolean;
  userId: string;
  location: string;
}

const FollowButton = ({ following, userId, location }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [followed, setFollowed] = useState(following)

  const handleFollow = async () => {
    const response = await axios.put(`${BASE_URL}/api/follow`, {
      currUser: userProfile._id,
      userToFollow: userId,
      follow: followed
    })

    console.log(response.data)

    followed ? setFollowed(false) : setFollowed(true)
  }

  const suggestedStyles1 = location === 'suggested' ? 'bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-700 hidden md:block cursor-pointer' : ''
  const suggestedStyles2 = location === 'suggested' ? 'flex text-lg font-semibold items-center gap-2 text-[#1FB954]' : ''
  const searchStyles1 = location === 'search' ? 'bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-700 cursor-pointer' : ''
  const searchStyles2 = location === 'search' ? 'flex text-lg font-semibold items-center gap-2 text-[#1FB954]' : ''


  return (
    <div 
      className={`${suggestedStyles1} ${searchStyles1}`}
      onClick={handleFollow}
    >
      <p className={`${suggestedStyles2} ${searchStyles2}`}>
        <RiUserFollowLine />
        Follow
      </p>
    </div>
  )
}

export default FollowButton