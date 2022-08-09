import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import PostCard from '../components/PostCard'
import { Like } from '../types'

interface IProps {
  posts: Like[]
}

const Home: NextPage = () => {
  return (
    <div className='flex flex-col gap-10 h-full pt-3'>
      <PostCard />
    </div>
  )
}

export default Home
