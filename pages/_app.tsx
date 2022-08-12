import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar';
import useAuthStore from '../store/authStore';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const [render, setRender] = useState('');

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if(isSSR) return null

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp
