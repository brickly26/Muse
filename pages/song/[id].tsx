import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import LikeButton from "../../components/LikeButton";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import useAuthStore from "../../store/authStore";
import { genres } from "../../utils/constants";
import { BASE_URL, checkIfAlreadyLiked } from "../../utils";

interface IProps {
  songDetails: {
    lyrics: string[] | boolean;
    shortLyrics: string[] | boolean;
    type: string;
    artist: {
      id: string;
      name: string;
    }[];
    name: string;
    album:
      | boolean
      | {
          id: string;
          name: string;
        };
    image: string;
    uri: string;
    releaseDate: string;
  };
}

const Song = ({ songDetails }: IProps) => {
  const router = useRouter();
  const { id }: any = router.query;
  const { userLikes, userProfile } = useAuthStore();
  const [postId, setPostId] = useState(checkIfAlreadyLiked(
    {
      type: "song",
      image: songDetails.image,
      name: songDetails.name,
      spotifyId: songDetails.uri.split(':')[2]
    },
    userLikes
  ));
  const [liked, setLiked] = useState(checkIfAlreadyLiked(
    {
      type: "song",
      image: songDetails.image,
      name: songDetails.name,
      spotifyId: songDetails.uri.split(':')[2]
    },
    userLikes
  ).length > 0);
  const [lyrics, setLyrics] = useState(true);

  console.log(songDetails)

  useEffect(() => {
    const alreadyLiked = checkIfAlreadyLiked(
      {
        type: "song",
        image: songDetails.image,
        name: songDetails.name,
        spotifyId: songDetails.uri.split(':')[2]
      },
      userLikes
    );

    // setColor(genres[Math.floor(Math.random() * 10 + 1)].color);
    setLiked(alreadyLiked.length > 0);
    setPostId(alreadyLiked);
  }, [liked, songDetails.image, songDetails.name, userLikes]);

  const handleLyrics = () => {
    if (lyrics) {
      setLyrics(false);
    } else {
      setLyrics(true);
    }
  };

  return (
    <div className="w-full px-10">
      <div className="flex items-center justify-between w-full my-10 rounded bg-gray2">
        <div className="flex sm:gap-6 w-full">
          <div className="flex items-center m-5">
            <Image
              src={songDetails.image}
              width={200}
              height={200}
              className="rounded-md"
              alt={songDetails.name}
            />
          </div>
          <div className="flex flex-col py-3 justify-around flex-1 w-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <p className="sm:text-2xl text-lg mb-3">{songDetails.name}</p>
                <div className="flex flex-col">
                  <p className="sm:text-lg text-md text-gray3">
                    By:&nbsp;&nbsp;
                    {songDetails.artist.map((artist: any, idx: number) => {
                      if (songDetails.artist.length - 1 !== idx) {
                        return (
                          <Link key={idx} href={`/artist/${artist.id}`}>
                            <span className="cursor-pointer hover:underline">
                              {artist.name},&nbsp;&nbsp;
                            </span>
                          </Link>
                        );
                      } else {
                        return (
                          <Link href={`/artist/${artist.id}`}>
                            <span className="cursor-pointer hover:underline">
                              {artist.name}
                            </span>
                          </Link>
                        );
                      }
                    })}
                  </p>
                  <p className="text-lg sm:block hidden sm text-gray3">
                    Released Date:&nbsp;&nbsp;
                    {moment(songDetails.releaseDate).format("MMM Do YYYY")}
                  </p>
                  {songDetails.album ? (
                    <div className="flex w-[150px]">
                      <p className="sm:text-lg text-md">Album:&nbsp;&nbsp;</p>
                      <Link href={`/album/${songDetails.album.id}`}>
                        <p className="text-gray3 sm:text-lg text-md hover:underline cursor-pointer">{`${songDetails.album.name}`}</p>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-gray3 text-lg">Single</p>
                  )}
                </div>
              </div>
              <div className="md:mr-16 mr-8 pl-4">
                {userProfile && (
                  <LikeButton
                    alreadyLiked={liked}
                    post={{
                      name: songDetails.name,
                      _id: liked ? postId : songDetails.uri,
                      type: "song",
                      image: songDetails.image,
                      by: songDetails.artist.map((artist: any) => artist.name),
                      spotifyId: id,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <iframe
        className="rounded-md"
        src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>

      <p className="text-3xl mx-auto mt-10 mb-5">Lyrics</p>

      <div className="rounded-md bg-[#27856A] p-10 w-full mx-auto">
        {songDetails.lyrics &&
          (lyrics ? (
            <>
              <div className="flex justify-center">
                <div
                  onClick={handleLyrics}
                  className="flex flex-col item-center hover:shadow-md cursor-pointer rounded-md shadow-xl mb-5 py-2 px-5"
                >
                  <p className="text-2xl">More</p>
                  <MdOutlineKeyboardArrowDown className="text-xl text-center block m-auto" />
                </div>
              </div>
              <div>
                {songDetails.shortLyrics.map((lyric: string, idx: number) => (
                  <p key={idx} className="sm:text-2xl text-lg">
                    {lyric}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div
                  onClick={handleLyrics}
                  className="flex flex-col item-center hover:shadow-md cursor-pointer rounded-md shadow-xl mb-5 py-2 px-5"
                >
                  <p className="text-2xl">Less</p>
                  <MdOutlineKeyboardArrowUp className="text-xl text-center block m-auto" />
                </div>
              </div>
              <div>
                {songDetails.lyrics.map((lyric: string, idx: number) => (
                  <p key={idx} className="sm:text-2xl text-lg">
                    {lyric}
                  </p>
                ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: "string" };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/song/${id}`);

  return {
    props: { songDetails: data },
  };
};

export default Song;
