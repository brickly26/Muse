import axios from 'axios'
import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

import { Like } from '../types'
import { BASE_URL } from '../utils'

interface IProps {
  posts: Like[]
}

const Home = ({ posts }: IProps) => {
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const { userProfile } = useAuthStore();

  const getFollowingLikes = async (userId) => {
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
      {posts.map(post: Like, idx: number) => {
        const liked = checkIfAlreadyLiked()
      }}
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
