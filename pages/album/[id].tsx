import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LikeButton from "../../components/LikeButton";
import { BASE_URL, checkIfAlreadyLiked } from "../../utils";
import useAuthStore from "../../store/authStore";

interface IProps {
  albumDetails: {
    spotifyId: string;
    name: string;
    image: string;
    by: {
      name: string;
      spotifyId: string;
    }[];
    releaseDate: string;
    songs: {
      name: string;
      spotifyId: string;
      playCount: string;
    }[];
  };
}

const Album = ({ albumDetails }: IProps) => {
  const { userProfile, userLikes } = useAuthStore();
  const router = useRouter();
  const postId = checkIfAlreadyLiked(
    albumDetails,
    userLikes
  );
  const liked = checkIfAlreadyLiked(
    albumDetails,
    userLikes
  ).length > 0;

  const handleRoute = (route: string, id: string) => {
    router.push(`/${route}/${id}`);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mt-10 rounded bg-gray2">
        <div className="flex lg:gap-6 w-full">
          <div className="flex items-center m-5">
            <Image
              src={albumDetails.image}
              width={200}
              height={200}
              className="rounded-md"
              alt={albumDetails.name}
            />
          </div>
          <div className="flex flex-col justify-around flex-1 w-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <p className="lg:text-2xl text-lg mb-3">{albumDetails.name}</p>
                <div className="flex flex-col">
                  <p className="lg:text-lg text-md text-gray3">
                    By:&nbsp;&nbsp;
                    {albumDetails.by.map((artist: any, idx: number) => {
                      if (albumDetails.by.length - 1 !== idx) {
                        return (
                          <Link href={`/artist/${artist.spotifyId}`} key={idx}>
                            <span className="cursor-pointer hover:underline">
                              {artist.name},&nbsp;&nbsp;
                            </span>
                          </Link>
                        );
                      } else {
                        return (
                          <Link href={`/artist/${artist.spotifyId}`}>
                            <span className="cursor-pointer hover:underline">
                              {artist.name}
                            </span>
                          </Link>
                        );
                      }
                    })}
                  </p>
                  {/* <p className="text-lg text-gray3">
                        Released Date:&nbsp;&nbsp;
                        {moment(albumDetails.releaseDate).format("MMM Do YYYY")}
                      </p> */}
                </div>
              </div>
              <div className="lg:mr-16 lg:pl-10 mr-4">
                {userProfile && (
                  <LikeButton
                    alreadyLiked={liked}
                    post={{
                      name: albumDetails.name,
                      _id: liked ? postId : albumDetails.spotifyId,
                      type: "album",
                      image: albumDetails.image,
                      by: albumDetails.by.map((artist: any) => artist.name),
                      spotifyId: albumDetails.spotifyId,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-2xl">Songs</p>
      <div className="rounded-md bg-gray2 p-8 w-full mx-auto">
        {albumDetails.songs.map((song: any, idx: number) => {
          const alreadyLiked = checkIfAlreadyLiked(
            {
              spotifyId: song.spotifyId
            },
            userLikes
          );

          let liked1 = false;

          if (alreadyLiked.length > 0) {
            liked1 = true;
          }

          return (
            <div
              key={idx}
              onClick={() => handleRoute("song", song.spotifyId)}
              className={`flex justify-between pt-2 ${
                idx === albumDetails.songs.length - 1
                  ? "border-none"
                  : "border-gray3 border-b-2 pb-2"
              }`}
            >
              <div className="flex gap-4 items-center cursor-pointer">
                <p className="text-xl pl-3">{idx + 1}</p>
                <p className="text-lg">{song.name}</p>
              </div>
              <div className="flex gap-6 items-center">
                <p>{song.playCount}</p>
                {userProfile && (
                  <LikeButton
                    alreadyLiked={liked1}
                    post={{
                      _id: liked1 ? alreadyLiked : song.spotifyId,
                      type: "song",
                      name: song.name,
                      image: albumDetails.image,
                      spotifyId: song.spotifyId,
                      by: albumDetails.by.map((artist: any) => artist.name)
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/album/${id}`);

  return {
    props: { albumDetails: data },
  };
};

export default Album;
