import axios from 'axios'
import React, { useEffect, useState } from 'react';

import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import SongCard from '../components/SongCard';
import useAuthStore from '../store/authStore';
import { Like } from '../types'
import { BASE_URL } from '../utils'
import { checkIfAlreadyLiked } from '../utils'

interface IProps {
  posts: Like[]
}

const Home = ({ posts }: IProps) => {
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const { userProfile } = useAuthStore();

  console.log(posts)

  const getFollowingLikes = async (userId: any) => {
    const response = await axios.get(`${BASE_URL}/api/feed/${userId}`)

    if(response.status === 200) {
      setRenderedPosts(response.data)
    } else {
      setRenderedPosts(posts)
    }
  }

  useEffect(() => {
    if(userProfile) {
      getFollowingLikes(userProfile._id)
    } else {
      setRenderedPosts(posts)
    }
  }, [renderedPosts])

  return (
    <div className='flex flex-col gap-10 h-full pt-3'>
      {posts.map((post: Like, idx: number) => {
        let liked = false
        let check = ''
        if(userProfile) {
          check = checkIfAlreadyLiked(userProfile._id)
        }

        if(check.length > 0) {
          liked = true
        }

        if(post.type === 'song') {
          return <SongCard post={song} alreadyLiked={liked} key={idx} />
        } else if (post.type === 'album') {
          return <AlbumCard post={post} alreadyLiked={liked} key={idx} />
        } else if (post.type === 'artist') {
          return <ArtistCard post={artist} alreadyLiked={liked} key={idx} />
        }
      })}
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${BASE_URL}/api/feed`)

  return {
    props: { posts: response.data }
  }
}

export default Home
