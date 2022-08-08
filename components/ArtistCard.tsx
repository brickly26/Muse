import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { BsHeartFill } from 'react-icons/bs'

interface IProps {
  post: {
    _id: string;
    name: string;
    type: string;
    image: string;
  }
}

const ArtistCard = ({ post }: IProps) => {
  return (
    <div className="lg:w-[500px] lg:h-[600px] w-[200px] h-[300px] md:h-[400px] mb-10 rounded cursor-pointer bg-gray2">
      <div className="rounded-md lg:w-[450px] lg:h-[450px] mt-6 m-auto">
        <Image
          width={62}
          height={62}
          className="rounded-full"
          src={post.image}
          layout="responsive"
        />
      </div>
      <div className="flex m-6">
        <div className="flex-3">
          <p className="text-2xl text-white mb-3">{post.name}</p>
          <p className="text-lg text-gray-400 hover:underline">
            {post.type}
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

export default ArtistCard;
