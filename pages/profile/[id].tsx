import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { BASE_URL, checkIfAlreadyFollowing } from '../../utils';
import { Like, IUser } from '../../types'
import { checkIfAlreadyLiked } from "../../utils";
import SongCard from '../../components/SongCard';
import ArtistCard from '../../components/ArtistCard';
import AlbumCard from '../../components/AlbumCard';
import NoResults from '../../components/NoResults';
import useAuthStore from '../../store/authStore';
import UserBadge from '../../components/UserBadge';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

interface IProps {
  user: any
}

const Profile = ({ user }: IProps ) => {
  const { userLikes, userProfile, fetchUserLikes, userFollowers } = useAuthStore();
  const [currUser, setUser] = useState(userProfile)
  const [tab, setTab] = useState('likes');
  const [render, setRender] = useState('false');

  useEffect(() => {
    if(currUser) {
      fetchUserLikes(user._id);
    }
  }, [currUser])

  const likesTab = tab === "likes" ? "border-b-2 border-white" : "text-gray3";
  const followingTab = tab === "following" ? "border-b-2 border-white" : "text-gray3";
  const followersTab = tab === "followers" ? "border-b-2 border-white" : "text-gray3";

  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black'>
        <Navbar setRender={setRender} />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1'>
          <div className="w-full">
      <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${user._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={user.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link href={`/`}>
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 text-lg items-center font-bold">
                    {user.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {user.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>


      <div className="flex gap-10 mb-10 mt10 border-b-2 border-gray3 w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${likesTab}`}
          onClick={() => setTab("likes")}
        >
          Likes
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${followersTab}`}
          onClick={() => setTab("followers")}
        >
          Followers
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${followingTab}`}
          onClick={() => setTab("following")}
        >
          Following
        </p>
      </div>

      {tab === "likes" && (
        user.likes.length > 0 ? (
          user.likes.map((like: any, idx: number) => {
            const type = like.type
            let liked = false;
            const alreadyLikedId = checkIfAlreadyLiked(like, userLikes);

            console.log('1',alreadyLikedId);

            if(alreadyLikedId.length > 0) {
              like._id = alreadyLikedId
              liked = true
            }

            console.log(liked)

            if (type === 'song') {
              return (
                <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
                  <SongCard post={like} alreadyLiked={liked} key={idx} />
                </div>
              )
            } else if (type === 'artist') {
              return (
                <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
                  <ArtistCard post={like} alreadyLiked={liked} key={idx} />
                </div>
              )
            } else if (type === 'album') {
              return (
                <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
                  <AlbumCard post={like} alreadyLiked={liked} key={idx} />
                </div>
              )
            }
          })
        ) : (
          <NoResults text={'No Likes'} />
        )
      )}

      {tab === "followers" && (
        user.followers.length > 0 ? (
          user.followers.map((user: any, idx: number) => {
            let followed
            if (userProfile) {
              followed = checkIfAlreadyFollowing(user._id, userFollowers);
            }

            return <UserBadge user={user} location='search' following={followed} />
          })
        ) : (
          <NoResults text={'No Likes'} />
        )
      )}  

      {tab === "following" && (
        user.following.length > 0 ? (
          user.following.map((user: any, idx: number) => {
            let followed
            if (userProfile) {
              followed = checkIfAlreadyFollowing(user._id, userFollowers);
            }

            return <UserBadge user={user} location='search' following={followed} />
          })
        ) : (
          <NoResults text={'No Likes'} />
        )
      )}  
    </div>
          </div>
        </div>
      </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { user: res.data[0] }
  }
};

export default Profile