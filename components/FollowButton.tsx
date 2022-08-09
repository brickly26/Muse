import React, { useState } from 'react'
import axios from 'axios';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

interface IProps {
  following: boolean;
  userId: string
}

const FollowButton = ({ following, userId }: IProps) => {
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

  return (
    <div 
      className='bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-700 cursor-pointer'
      onClick={handleFollow}
    >
      <p className='flex text-lg font-semibold items-center gap-2 text-[#1FB954]'>
        <RiUserFollowLine />
        Follow
      </p>
    </div>
  )
}

export default FollowButton