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
  const [render, setRender] = useState("");
  const [postId, setPostId] = useState("");
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState("");
  const [lyrics, setLyrics] = useState(true);
  const { userLikes, userProfile } = useAuthStore();

  console.log(songDetails);

  useEffect(() => {
    const alreadyLiked = checkIfAlreadyLiked(
      {
        type: "song",
        image: songDetails.image,
        name: songDetails.name,
      },
      userLikes
    );

    // setColor(genres[Math.floor(Math.random() * 10 + 1)].color);
    setLiked(alreadyLiked.length > 0 ? true : false);
    setPostId(alreadyLiked);
  }, [liked]);

  const handleLyrics = () => {
    if (lyrics) {
      setLyrics(false);
    } else {
      setLyrics(true);
    }
  };

  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black">
      <Navbar setRender={setRender} />
      <div className="flex gap-3 md:gap-20">
        <div className="h-[92vh]">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-6 overflow-x-hidden w-full mr-10 overflow-y-auto h-[88vh]">
          <div className="flex items-center justify-between w-full my-10 rounded bg-gray2">
            <div className="flex gap-6 w-full">
              <div className="flex items-center m-5">
                <Image
                  src={songDetails.image}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col justify-around flex-1 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col justify-center">
                    <p className="text-2xl mb-3">{songDetails.name}</p>
                    <div className="flex flex-col">
                      <p className="text-lg text-gray3">
                        By:&nbsp;&nbsp;
                        {songDetails.artist.map(
                          (artist: any, idx: number) => {
                            if (songDetails.artist.length - 1 !== idx) {
                              return (
                                <Link href={`/artist/${artist.id}`}>
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
                          }
                        )}
                      </p>
                      <p className="text-lg text-gray3">
                        Released Date:&nbsp;&nbsp;
                        {moment(songDetails.releaseDate).format("MMM Do YYYY")}
                      </p>
                      {songDetails.album ? (
                        <div className="flex">
                          <p className="text-lg">Album:&nbsp;&nbsp;</p>
                          <Link href={`/album/${songDetails.album.id}`}>
                            <p className="text-gray3 text-lg hover:underline cursor-pointer">{`${songDetails.album.name}`}</p>
                          </Link>
                        </div>
                      ) : (
                        <p className="text-gray3 text-lg">Single</p>
                      )}
                    </div>
                  </div>
                  <div className="mr-16 pl-10">
                    {userProfile && (
                      <LikeButton
                      alreadyLiked={liked}
                      post={{
                        name: songDetails.name,
                        _id: liked ? postId : songDetails.uri,
                        type: "song",
                        image: songDetails.image,
                        by: songDetails.artist,
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

          <p className="text-3xl mx-auto">Lyrics</p>
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
                    {songDetails.shortLyrics.map((lyric: string) => (
                      <p className="text-2xl">{lyric}</p>
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
                    {songDetails.lyrics.map((lyric: string) => (
                      <p className="text-2xl">{lyric}</p>
                    ))}
                  </div>
                </>
              ))}
          </div>
        </div>
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
