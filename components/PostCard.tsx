import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go'


const PostCard = () => {
  const rocky = {
    name: 'Rocky IV',
    by: 'Rocky',
    image: "https://i.scdn.co/image/ab67616d00001e02f4a2ccbe20d6d52f16816812",
    likedBy: {
      _id: 'ajshdka',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      userName: 'Brickly26'
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <Link href={`/profile/${rocky.likedBy._id}`}>
              <div>
                <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={rocky.likedBy.image}
                  alt='profile photo'
                  layout='responsive'
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${rocky.likedBy._id}`}>
            
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard