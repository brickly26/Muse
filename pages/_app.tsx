import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
