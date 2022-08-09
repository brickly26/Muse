import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs'

interface IProps {
  post: {
    _id: string;
    image: string;
    name: string;
    by: string[];
  };
}

const AlbumCard = ({ post }: IProps) => {
  const [error, setError] = useState(false);

  const musicPic = 'https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp';
  
  return (
    <div className="lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
      <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
        <Image
          width={62}
          height={62}
          className="rounded-md"
          onError={() => setError(true)}
          src={!error ? post.image : musicPic}
          layout="responsive"
        />
      </div>
      <div className="flex m-6">
        <div className="flex-3">
          <p className="text-2xl text-white mb-3">{post.name}</p>
          <p className="text-lg text-gray-400 hover:underline">
            {post.by.map((artist) => `${artist}, `)}
          </p>
        </div>
        <div className="flex justify-end mr-5 items-center flex-1">
          <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1fb954]">
            <BsHeartFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
