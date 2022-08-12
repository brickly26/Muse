import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import LikeButton from '../../components/LikeButton';
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import useAuthStore from '../../store/authStore';
import { BASE_URL, checkIfAlreadyLiked } from '../../utils';

interface IProps {
  songDetails: {
    lyrics: string[] | boolean;
    type: string,
    artists: string[]
    name: string;
    album: boolean | {
      id: string
      name: string
    };
    image: string;
    uri: string
  }
}

const Song = ({ songDetails }: IProps) => {
  const [render, setRender] = useState('');
  const [postId, setPostId] = useState('');
  const [liked, setLiked] = useState(false)
  const { userLikes } = useAuthStore()

  useEffect(() => {
    const alreadyLiked = checkIfAlreadyLiked({
      type: 'song',
      image: songDetails.image,
      name: songDetails.name
    }, userLikes);

    setLiked(alreadyLiked.length > 0 ? true : false)
    setPostId(alreadyLiked);
  }, [])
  

  return (
    <div className="absolute w-full m-auto overflow-hidden h-[100vh]">
      <Navbar setRender={setRender}/>
      <div className='flex gap-6 md:gap-20'>
        <div>
          {`<Image />`}
        </div>
        <div>
          <p>{songDetails.name}</p>
          {songDetails.album ? (
            <><p>Album</p><Link href={`/album/${songDetails.album.id}`}>
              <p>{songDetails.album.name}</p>
            </Link></>
          ) : (
            <p>Single</p>
          )}
        </div>
        <div>
          <LikeButton
            alreadyLiked={liked}
            post={{
              name: songDetails.name,
              _id: liked ? postId : songDetails.uri,
              type: 'song',
              image: songDetails.image,
              by: songDetails.artists
            }}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: 'string' };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/song/${id}`);

  return {
    props: { songDetails: data },
  }
}

export default Song