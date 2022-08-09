import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Like, IUser } from '../../types'
import { checkIfAlreadyLiked } from "../../utils";
import SongCard from '../../components/SongCard';
import ArtistCard from '../../components/ArtistCard';
import AlbumCard from '../../components/AlbumCard';
import NoResults from '../../components/NoResults';

interface IProps {
  user: any
}

const Profile = ({ user }: IProps ) => {
  const [tab, setTab] = useState('likes');

  const likesTab = tab === "likes" ? "border-b-2 border-white" : "text-gray3";
  const followingTab = tab === "following" ? "border-b-2 border-white" : "text-gray3";
  const followersTab = tab === "followers" ? "border-b-2 border-white" : "text-gray3";

  console.log(user)

  return (
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

      {/* {tab === "following" && (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex items-center justify-between gap-3 hover:bg-primary bg-gray2 mb-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="m-3">
                      <Image
                        src={user.image}
                        width={100}
                        height={100}
                        className="rounded-full"
                        alt="profile photo"
                      />
                    </div>

                    <div className="ml-5">
                      <p className="flex gap-1 items-center text-xl font-bold capitalize mb-3">
                        {user.userName}
                        <GoVerified className="text-[#1fb954]" />
                      </p>
                      <p className="lowercase text-gray-400 text-md">
                        {user.userName.replaceAll(" ", "")}
                      </p>
                    </div>
                  </div>
                  <div>
                    {!following ? (
                      <button className="flex">
                        <RiUserFollowFill />
                        <p>Follow</p>
                      </button>
                    ) : (
                      <button className="">
                        <RiUserUnfollowFill />
                        <p>Follow</p>
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No account results for ${searchTerm}`}
              music={false}
            />
          )}
        </div>
      )} */}

      {tab === "likes" && (
        user.likes.length > 0 ? (
          user.likes.map((like: any, idx: number) => {
            const type = like.type
            let liked = false;
            const alreadyLikedId = checkIfAlreadyLiked(like);

            if(alreadyLikedId.length > 0) {
              like._id = alreadyLikedId
              liked = true
            }

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
              <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
                <AlbumCard post={like} alreadyLiked={liked} key={idx} />
              </div>
            }
          })
        ) : (
          <NoResults text={'No Likes'} />
        )
      )}
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