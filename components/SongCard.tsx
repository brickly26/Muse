import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/Link'
import { BsHeartFill } from 'react-icons/bs'

interface IProps {
  post: {
    _id: string;
    name: string;
    type: string;
    image: string;
    by: string[];
  };
}

const SongCard = ({ post }: IProps) => {
  const [error, setError] = useState(false);

  const musicPic = 'https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp'

  return (
    <Link href={`./song/${post._id}`}>
      <div className="flex items-center justify-between lg:w-[500px] lg:h-[150px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
        <div className="flex gap-2 h-full items-center">
          <div className="rounded-md lg:w-[100px] lg:h-[100px] mx-5">
            <Image
              width={62}
              height={62}
              className="rounded-md"
              onError={() => setError(true)}
              src={!error ? post.image : musicPic}
              layout="responsive"
            />
          </div>
          <div className="flex">
            <div className="flex-3">
              <p className="text-xl text-white mb-3">{post.name}</p>
              <p className="text-md text-gray-400 hover:underline">
                {post?.by.map((artist) => `${artist}, `)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954] mr-10">
          <BsHeartFill />
        </div>
      </div>
    </Link>
  );
};

export default SongCard;
