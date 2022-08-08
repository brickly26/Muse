import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsHeartFill } from "react-icons/Bs";

const PostCard = () => {
  const rocky = {
    type: "album",
    name: "Rocky IV",
    by: "Rocky",
    image: "https://i.scdn.co/image/ab67616d00001e02f4a2ccbe20d6d52f16816812",
    likedBy: {
      _id: "ajshdka",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      userName: "Brickly26",
    },
  };

  const rockwell = {
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
    type: 'song',
    name: 'rockstar (feat. 21 Savage)',
    by: ['Post Malone', '21 Savage'],
    image: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268",
    likedBy: {
      _id: "ajshdka",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      userName: "Brickly26",
    },
  }


  return (
    <>
      {/* rocky album */}

      <div className="flex flex-col border-b-2 border-gray3 pb-6">
        <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${rocky.likedBy._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={rocky.likedBy.image}
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
                    {rocky.likedBy.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {rocky.likedBy.userName}
                  </p>
                </div>
              </Link>
              <p className="text-sm mt-3">{`Liked this album a few seconds ago`}</p>
            </div>
          </div>
        </div>

        {rocky.type === "album" && (
          <div className="lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
            <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
              <Image
                width={62}
                height={62}
                className="rounded-md"
                src={rocky.image}
                layout="responsive"
              />
            </div>
            <div className="flex m-6">
              <div className="flex-3">
                <p className="text-2xl text-white mb-3">{rocky.name}</p>
                <p className="text-lg text-gray-400 hover:underline">
                  {rocky.by}
                </p>
              </div>
              <div className="flex justify-end mr-5 items-center flex-1">
                <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]">
                  <BsHeartFill />
                </div>
              </div>
            </div>
          </div>
        )}
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
              <p className="text-sm mt-3">{`Liked this album a few seconds ago`}</p>
            </div>
          </div>
        </div>

        {rockwell.type === "artist" && (
          <div className="lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
            <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={rockwell.image}
                layout="responsive"
              />
            </div>
            <div className="flex m-6">
              <div className="flex-3">
                <p className="text-2xl text-white mb-3">{rockwell.name}</p>
                <p className="text-lg text-gray-400 hover:underline">
                  {rockwell.type}
                </p>
              </div>
              <div className="flex justify-end mr-5 items-center flex-1">
                <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]">
                  <BsHeartFill />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Song */}

      <div className="flex flex-col border-b-2 border-gray3 pb-6">
        <div className="mb-5">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${rocky.likedBy._id}`}>
                <div className="m-0 p-0">
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={rocky.likedBy.image}
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
                    {rocky.likedBy.userName}
                    <GoVerified className="text-[#1FB954] text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {rocky.likedBy.userName}
                  </p>
                </div>
              </Link>
              <p className="text-sm mt-3">{`Liked this album a few seconds ago`}</p>
            </div>
          </div>
        </div>

        {rockstar.type === "song" && (
          <div className="flex items-center justify-between lg:w-[500px] lg:h-[150px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
            <div className="flex gap-2 h-full items-center">
              <div className="rounded-md lg:w-[100px] lg:h-[100px] mx-5">
                <Image
                  width={62}
                  height={62}
                  className="rounded-md"
                  src={rockstar.image}
                  layout="responsive"
                  />
              </div>
              <div className="flex">
                <div className="flex-3">
                  <p className="text-xl text-white mb-3">{rockstar.name}</p>
                  <p className="text-md text-gray-400 hover:underline">
                    {rockstar.by.map((artist) => (`${artist}, `))}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954] mr-10">
              <BsHeartFill />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostCard;
