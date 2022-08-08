import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar';
import LoginModal from '../components/LoginModal';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if(isSSR) return null

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div id="modal"></div>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp
