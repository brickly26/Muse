import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

import { BASE_URL } from "../../utils";
import { IUser, Like } from "../../types";
import useAuthStore from "../../store/authStore";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/NoResults";
import SongCard from "../../components/SongCard";
import ArtistCard from "../../components/ArtistCard";
import AlbumCard from "../../components/AlbumCard";

interface IProps {
  albums: Like[];
  songs: Like[];
  artists: Like[];
}

const Search = ({ albums, songs, artists }: IProps) => {
  const [following, setFollowing] = useState(true);
  const [tab, setTab] = useState("song");
  const router = useRouter();
  const query = router.query;
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  console.log(query)

  const albumTab = tab === "album" ? "border-b-2 border-white" : "text-gray3";
  const artistTab = tab === "artist" ? "border-b-2 border-white" : "text-gray3";
  const songTab = tab === "song" ? "border-b-2 border-white" : "text-gray3";
  const accountTab =
    tab === "account" ? "border-b-2 border-white" : "text-gray3";
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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

      {tab === "song" && (
        <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
          {songs.map((song: Like, idx: number) => (
            <SongCard post={song} key={idx} />
          ))}
        </div>
      )}

      {tab === "artist" && (
        <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
          {artists.map((artist: Like, idx: number) => (
            <ArtistCard post={artist} key={idx} />
          ))}
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
