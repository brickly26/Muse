import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Like, IUser } from '../../types'
import SongCard from '../../components/SongCard';

interface IProps {
  user: {
    name: string;
    image: string;
    likes: Like;
    following: IUser[]
    followers: IUser[]
  }
}

const Profile = ({ user }: IProps) => {
  const [tab, setTab] = useState('likes');
  

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md:text-xl text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>


      <div className="flex gap-10 mb-10 mt10 border-b-2 border-gray3 w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accountTab}`}
          onClick={() => setTab("account")}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${songTab}`}
          onClick={() => setTab("song")}
        >
          Tracks
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${artistTab}`}
          onClick={() => setTab("artist")}
        >
          Artists
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${albumTab}`}
          onClick={() => setTab("album")}
        >
          Albums
        </p>
      </div>

      {tab === "following" && (
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
      )}

      {tab === "likes" && (
        user.likes.length > 0 ? (
          user.likes.map((like: Like, idx: number) => {
            const type = like.type

            if (type === 'song') {
              return (
                <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
                  <SongCard post={like} key={idx} />
                </div>
              )
            } else if (type === 'album') {
              return (

              )
            }
          })
        ) : (

        )
      )}

      {tab === "artist" && (
        <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
          {artists.map((artist: Like, idx: number) => {
            const alreadyLikedId = checkIfAlreadyLiked(artist);
            let liked = false

            if(alreadyLikedId.length > 0) {
              artist._id = alreadyLikedId
              liked = true
            }

            return <ArtistCard post={artist} alreadyLiked={liked} key={idx} />
          })}
        </div>
      )}

      {tab === "album" && (
        <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
          {albums.map((album: Like, idx: number) => (
            <AlbumCard post={album} key={idx} />
          ))}
        </div>
      )}


    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/profile/${id}`);

  console.log(res)

  return {
    props: { user: res.data }
  }
};

export default Profile