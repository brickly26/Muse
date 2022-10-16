import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

import { BASE_URL, checkIfAlreadyFollowing } from "../../utils";
import { IUser, Like } from "../../types";
import useAuthStore from "../../store/authStore";
import { GoVerified } from "react-icons/go";
import { checkIfAlreadyLiked } from "../../utils";
import NoResults from "../../components/NoResults";
import SongCard from "../../components/SongCard";
import ArtistCard from "../../components/ArtistCard";
import AlbumCard from "../../components/AlbumCard";
import UserBadge from "../../components/UserBadge";
import Sidebar from "../../components/Sidebar";

interface IProps {
  albums: Like[];
  songs: Like[];
  artists: Like[];
}

const Search = ({ albums, songs, artists }: IProps) => {
  const { allUsers, fetchUserLikes, userProfile, userLikes, userFollowers } =
    useAuthStore();
  const [user, setUser] = useState<IUser | null>(userProfile);
  const [tab, setTab] = useState("song");
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const [render, setRender] = useState("false");

  const albumTab = tab === "album" ? "border-b-2 border-white" : "text-gray3";
  const artistTab = tab === "artist" ? "border-b-2 border-white" : "text-gray3";
  const songTab = tab === "song" ? "border-b-2 border-white" : "text-gray3";
  const accountTab =
    tab === "account" ? "border-b-2 border-white" : "text-gray3";
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      fetchUserLikes(user._id);
    }
  }, [user, fetchUserLikes]);

  return (
    <div className="flex gap-6 md:gap-20">
      <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
        <Sidebar />
      </div>
      <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] pr-5 flex-1">
        <div className="w-full">
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

          {tab === "account" && (
            <div className="md:mt-16">
              {searchedAccounts.length > 0 ? (
                searchedAccounts.map((user: IUser, idx: number) => {
                  console.log(userFollowers);
                  let followed = false;
                  if (userProfile) {
                    followed = checkIfAlreadyFollowing(
                      userProfile._id,
                      userFollowers
                    );
                  }

                  return (
                    <UserBadge
                      key={idx}
                      user={user}
                      location="search"
                      following={followed}
                    />
                  );
                })
              ) : (
                <NoResults
                  text={`No account results for ${searchTerm}`}
                  music={false}
                />
              )}
            </div>
          )}

          {tab === "song" && (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              {songs.map((song: Like, idx: number) => {
                const alreadyLikedId = checkIfAlreadyLiked(song, userLikes);
                let liked = false;

                if (alreadyLikedId.length > 0) {
                  song._id = alreadyLikedId;
                  liked = true;
                }

                return <SongCard post={song} alreadyLiked={liked} key={idx} />;
              })}
            </div>
          )}

          {tab === "artist" && (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              {artists.map((artist: Like, idx: number) => {
                const alreadyLikedId = checkIfAlreadyLiked(artist, userLikes);
                let liked = false;

                if (alreadyLikedId.length > 0) {
                  artist._id = alreadyLikedId;
                  liked = true;
                }

                return (
                  <ArtistCard post={artist} alreadyLiked={liked} key={idx} />
                );
              })}
            </div>
          )}

          {tab === "album" && (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              {albums.map((album: Like, idx: number) => {
                const alreadyLikedId = checkIfAlreadyLiked(album, userLikes);
                let liked = false;

                if (alreadyLikedId.length > 0) {
                  album._id = alreadyLikedId;
                  liked = true;
                }

                return (
                  <AlbumCard post={album} alreadyLiked={liked} key={idx} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: "string" };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      artists: res.data.artists || null,
      albums: res.data.albums || null,
      songs: res.data.tracks || null,
    },
  };
};

export default Search;
