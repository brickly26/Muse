import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
import { ImCancelCircle } from 'react-icons/im';

import useAuthStore from '../store/authStore';
import Logo from '../utils/muse.png';
import { createOrGetUser } from '../utils';

interface IProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: IProps) => {
  const portalContainer = document.getElementById('modal');
  const [user, setUser] = useState();
  const { userProfile, addUser, removeUser } = useAuthStore();


  return portalContainer ? ReactDOM.createPortal(
    <div className='fixed w-full h-full bg-[rgba(0,0,0,.15)] z-5 flex justify-center items-center'>
      <div className='relative w-[500px] h-[600px] bg-gray-200 border-radius rounded-md'>
        <p 
          className='absolute top-3 left-3 text-gray-400 cursor-pointer rounded-full hover:text-red-400'
          onClick={onClose}
        >
          <ImCancelCircle />
        </p>
        <div className='flex flex-col items-center'>
          <div className='w-[300px] mt-10'>
            <Image 
              className='cursor-pointer'
              src={Logo}
              alt="Muse"
              layout='responsive'
              />
          </div>
          <p>Sign in to continue</p>
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        </div>
      </div>
    </div>,
    portalContainer
  ) : null
}

export default LoginModal