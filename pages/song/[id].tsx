import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import LikeButton from "../../components/LikeButton";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
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
    artist: string[];
    name: string;
    album: boolean
      | {
          id: string;
          name: string;
        };
    image: string;
    uri: string;
  };
}

const Song = ({ songDetails }: IProps) => {
  const router = useRouter();
  const { id }: any = router.query;
  const [render, setRender] = useState("");
  const [postId, setPostId] = useState("");
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState("");
  const [lyrics, setLyrics] = useState(false)
  const { userLikes } = useAuthStore();

  // console.log('1', genres[Math.floor(Math.random() * 6 + 1)].color)

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
    if(lyrics) {
      setLyrics(false)
    } else {
      setLyrics(true)
    }
  };

  return (
    <div className="absolute w-full m-auto overflow-hidden h-[100vh]">
      <Navbar setRender={setRender} />
      <div className="flex flex-col gap-6 mx-10">
        <div className="flex items-center justify-between w-full my-10 rounded cursor-pointer bg-gray2">
          <div className="flex gap-6">
            <div className="flex items-center m-5">
              <Image
                src={songDetails.image}
                width={350}
                height={350}
                className="rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center gap-5">
                <p className="text-3xl">{songDetails.name}</p>
                {songDetails.album ? (
                  <div className="flex">
                    <p className="text-xl">Album:&nbsp;&nbsp;</p>
                    <Link href={`/album/${songDetails.album.id}`}>
                      <p className="text-gray3 text-xl hover:underline">{`${songDetails.album.name}`}</p>
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray3 text-xl hover:underline">Single</p>
                )}
              </div>
              <div className="mr-10 pl-10">
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
        <p className="text-3xl">Lyrics</p>
        <div 
          className='rounded-md bg-[#27856A] p-10'
        >
          <div className="flex justify-center">
            <div className="flex flex-col item-center shadow-md rounded-md hover:shadow-2xl py-2 px-5">
              <p className="text-2xl">More</p>
              <MdOutlineKeyboardArrowDown className="text-xl text-center" />
            </div>
          </div>
          <div>
            {songDetails.shortLyrics.map((lyric: string) => (
              <p>{lyric}</p>
            ))}
          </div>
        </div>
        {/* {songDetails.lyrics && (
          lyrics ? (
            <>
            <p className="text-3xl">Lyrics</p>
            <div 
            className='rounded-md bg-[#27856A] p-10'>
              <div className="text-2xl semibold p-3 flex item-center">
                <div onClick={handleLyrics} className="w-[150px] h-[60px] flex flex-col item-center shadow-md rounded-md hover:shadow-xl p-2">
                <p className="flex">More</p>
                <MdOutlineKeyboardArrowDown className="flex" />
                </div>
              </div>
              <div>
                {songDetails.shortLyrics.map((lyric: string) => (
                  <p>{lyric}</p>
                ))}
              </div>
            </div>
          </>
          ) : (
            <>
              <p className="text-3xl">Lyrics</p>
              <div 
              className='rounded-md bg-[#27856A] p-10'>
                <div className="text-2xl semibold hover:bg-rgba(0,0,0,.15) p-3 flex flex-col gap-6 item-center">
                  <div onClick={handleLyrics} className="w-[80px] h-[60px]">
                  <p>Less</p>
                  <MdOutlineKeyboardArrowDown />
                  </div>
                </div>
                <div>
                  {songDetails.lyrics.map((lyric: string) => (
                    <p>{lyric}</p>
                  ))}
                </div>
              </div>
            </>
        ))} */}
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
