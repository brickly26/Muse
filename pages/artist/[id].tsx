import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LikeButton from "../../components/LikeButton";
import { BASE_URL, checkIfAlreadyLiked } from "../../utils";
import useAuthStore from "../../store/authStore";

interface IProps {
  artistDetails: {
    name: string;
    spotifyId: string;
    image: string;
    listeners: number;
    wRank: number;
    topSongs: {
      image: string;
      name: string;
      spotifyId: string;
      playCount: string;
    }[];
    albums: {
      image: string;
      name: string;
      spotifyId: string;
    }[];
  };
}

const Artist = ({ artistDetails }: IProps) => {
  const [render, setRender] = useState(false);
  const router = useRouter();
  const { id }: any = router.query;
  const [liked, setLiked] = useState(false);
  const [postId, setPostId] = useState("");
  const [renderedAlbums, setRenderedAlbums] = useState(
    artistDetails.albums.length > 5
      ? artistDetails.albums.slice(0, 5)
      : artistDetails.albums
  );
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(artistDetails.albums.length / PER_PAGE);
  const { userLikes, userProfile } = useAuthStore();

  useEffect(() => {
    const alreadyLiked = checkIfAlreadyLiked(
      {
        type: "artist",
        image: artistDetails.image,
        name: artistDetails.name,
      },
      userLikes
    );

    setLiked(alreadyLiked.length > 0 ? true : false);
    setPostId(alreadyLiked);
  }, [liked, artistDetails.image, artistDetails.name, userLikes]);

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mt-10 rounded bg-gray2">
        <div className="flex gap-6 w-full">
          <div className="flex items-center m-5">
            <Image
              src={artistDetails.image}
              width={200}
              height={200}
              className="rounded-md"
              alt={artistDetails.name}
            />
          </div>
          <div className="flex flex-col justify-around flex-1 w-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-2xl mb-3">{artistDetails.name}</p>
                <div className="flex flex-col">
                  <p className="text-lg text-gray3">
                    World Ranking:&nbsp;&nbsp;#{artistDetails.wRank}
                  </p>
                  <p className="text-lg text-gray3">
                    Monthly Listeners:&nbsp;&nbsp;{artistDetails.listeners}
                  </p>
                </div>
              </div>
              <div className="mr-16 pl-10">
                {userProfile && (
                  <LikeButton
                    alreadyLiked={liked}
                    post={{
                      name: artistDetails.name,
                      _id: liked ? postId : artistDetails.spotifyId,
                      type: "artist",
                      image: artistDetails.image,
                      by: undefined,
                      spotifyId: id,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl">Top Songs</p>
      <div className="rounded-md bg-gray2 p-8 w-full mx-auto">
        {artistDetails.topSongs.map((song: any, idx: number) => {
          return (
            <div
              key={idx}
              className={`flex justify-between pt-2 ${
                idx === 4 ? "border-none" : "border-gray3 border-b-2 pb-2"
              }`}
            >
              <div className="flex gap-4 items-center">
                <p className="text-xl pl-3">{idx + 1}</p>
                <div>
                  <Image
                    src={song.image}
                    width={50}
                    height={50}
                    alt={song.name}
                  />
                </div>
                <p className="text-lg">{song.name}</p>
              </div>
              <div className="flex gap-6 items-center">
                <p>{song.playCount}</p>
                {userProfile && <LikeButton />}
              </div>
            </div>
          );
        })}
      </div>

      {/* <p className="text-2xl">Albums</p>
      <div className="rounded-md bg-gray2 p-8 w-full mx-auto">
        <div>{}</div>
        <div className="flex justify-end">
          <Pagination count={count} page={page} color="#1FB954" />
        </div>
      </div> */}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/artist/${id}`);

  return {
    props: { artistDetails: data },
  };
};

export default Artist;
