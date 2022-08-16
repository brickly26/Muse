import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils';

interface IProps {
  albumDetails: {
    name: string;
    image: string;
    by: {
      name: string;
      spotifyId: string
    }[];
    releaseDate: string;
    songs: {
      name: string;
      spotifyId: string;
      playCount: string;
    }
  }
}

const Album = ({ albumDetails }: IProps) => {
  const [render, setRender] = useState(true);
  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black">
      <Navbar setRender={setRender} />
      <div className="flex gap-3 md:gap-20">
        <div className="h-[92vh]">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-6 overflow-x-hidden w-full mr-10 overflow-y-auto h-[88vh]">
          <div className="flex items-center justify-between w-full mt-10 rounded bg-gray2">
            <div className="flex gap-6 w-full">
              <div className="flex items-center m-5">
                <Image
                  src={artistDetails.image}
                  width={200}
                  height={200}
                  className="rounded-md"
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


        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/album/${id}`)

  return {
    props: { albumDetails: data}
  }
}

export default Album;