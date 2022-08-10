import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsHeartFill } from "react-icons/Bs";


import UserBadge from "./UserBadge";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import SongCard from "./SongCard";
import { checkIfAlreadyFollowing } from "../utils";
import { resourceLimits } from "worker_threads";

const results = [
  {
    _createdAt: "2022-08-09T19:51:43Z",
    _id: "101046857955199823065",
    _rev: "bH1tSrYXMMh2n1OP38aS14",
    _type: "user",
    _updatedAt: "2022-08-09T19:51:43Z",
    followers: [],
    following: [],
    image: "https://lh3.googleusercontent.com/a-/AFdZucq3yc7NLR69BBDzG9ju1eHKBuYLhFyUeqx5ccTpQg=s96-c",
    userName: "Burak Aksu"
  },
  {
    _createdAt: "2022-08-09T19:56:18Z",
    _id: "106978780731036577572",
    _rev: "gGRdwlUj1n7PrTHHfhhfjB",
    _type: "user",
    _updatedAt: "2022-08-09T19:56:18Z",
    followers: [],
    following: [],
    image: "https://lh3.googleusercontent.com/a/AItbvmmCZFtm5CY70dGCmhPW31pgdM8HJ3RWPejoMnr-=s96-c",
    userName: "Burak Aksu"
  }
]

const PostCard = () => {
  const rocky = {
    _id: "abbbs",
    type: "album",
    name: "Rocky IV",
    by: ["Rocky"],
    image: "https://i.scdn.co/image/ab67616d00001e02f4a2ccbe20d6d52f16816812",
    likedBy: {
      _id: "ajshdka",
      userName: "Brickly26",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  };

  const rockwell = {
    _id: "dddd",
    type: "artist",
    name: "Rockwell",
    by: [],
    image: "https://i.scdn.co/image/ab67616d0000b27357de8cb9bbbe22a9e71c8af7",
    likedBy: {
      _id: "ajshdka",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      userName: "Brickly26",
    },
  };

  const rockstar = {
    _id: "hgfghf",
    type: "song",
    name: "rockstar (feat. 21 Savage)",
    by: ["Post Malone", "21 Savage"],
    image: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268",
    likedBy: {
      _id: "ajshdka",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      userName: "Brickly26",
    },
  };

  return (
    <>
      {results.map((user: any, idx: number) => {
        const following = checkIfAlreadyFollowing(user._id)


        return <UserBadge location="search" user={user} following={following} />
      })}

      {/* rocky album */}

      <div className="flex flex-col border-b-2 border-gray3 pb-6">
        
        <UserBadge location="feed" user={results[0]} post={rocky} />

        {rocky.type === "album" && <AlbumCard post={rocky} />}
      </div>

      {/* rockwell artist */}

      <div className="flex flex-col border-b-2 border-gray3 pb-6">
        <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${rockwell.likedBy._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={rockwell.likedBy.image}
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
                    {rockwell.likedBy.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {rockwell.likedBy.userName}
                  </p>
                </div>
              </Link>
              <p className="text-sm mt-3">{`Liked this ${rockwell.type} a few seconds ago`}</p>
            </div>
          </div>
        </div>

        {rockwell.type === "artist" && <ArtistCard post={rockwell} />}
      </div>

      {/* Song */}

      <div className="flex flex-col border-b-2 border-gray3 pb-6">
        <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${rockstar.likedBy._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={rockstar.likedBy.image}
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
                    {rockstar.likedBy.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {rockstar.likedBy.userName}
                  </p>
                </div>
              </Link>
              <p className="text-sm mt-3">{`Liked this ${rockstar.type} a few seconds ago`}</p>
            </div>
          </div>
        </div>

        {rockstar.type === "song" && <SongCard post={rockstar} />}
      </div>
    </>
  );
};

export default PostCard;
