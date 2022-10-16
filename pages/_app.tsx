import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import useAuthStore from "../store/authStore";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black">
        <Navbar setRender={setRender} />
        <Component {...pageProps} />
        {/* <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] pr-5 flex-1">
            <Component {...pageProps} />
          </div>
        </div> */}
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
