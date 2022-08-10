import axios from 'axios'
import React, { useEffect, useState } from 'react';

import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import PostCard from '../components/PostCard';
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
  const { userProfile, userLikes } = useAuthStore();
  const [user, setUser] = useState(userProfile)

  // if(true) {
  //   return <PostCard />
  // }

  useEffect(() => {
    if(user) {
      getFollowingLikes(user._id)
    }
  }, [user])

  const getFollowingLikes = async (userId: any) => {
    const response = await axios.get(`${BASE_URL}/api/feed/${userId}`)

    if(response.status === 200) {
      setRenderedPosts(response.data)
    }
  }

  return (
    <div className='flex flex-col gap-10 h-full pt-3'>
      {renderedPosts.map((post: Like, idx: number) => {
        let liked = false
        let check = ''
        if(userProfile) {
          check = checkIfAlreadyLiked(userProfile._id, userLikes)
        }

        if(check.length > 0) {
          liked = true
        }

        if(post.type === 'song') {
          return (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              <SongCard post={post} alreadyLiked={liked} key={idx} />
            </div>
          )
        } else if (post.type === 'album') {
          return (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              <AlbumCard post={post} alreadyLiked={liked} key={idx} />
            </div>
          )
        } else if (post.type === 'artist') {
          return (
            <div className="md:mt-16 flex md:flex-wrap gap-6 md:justify-start">
              <ArtistCard post={post} alreadyLiked={liked} key={idx} />
            </div>
          )
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
