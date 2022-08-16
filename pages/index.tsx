import axios from "axios";
import React, { useEffect, useState } from "react";

import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SongCard from "../components/SongCard";
import UserBadge from "../components/UserBadge";
import useAuthStore from "../store/authStore";
import { Like } from "../types";
import { BASE_URL } from "../utils";
import { checkIfAlreadyLiked } from "../utils";

interface IProps {
  posts: Like[];
}

const Home = ({ posts }: IProps) => {
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const { userProfile, userLikes } = useAuthStore();
  const [user, setUser] = useState(userProfile);
  const [render, setRender] = useState('false');

  useEffect(() => {
    if (user) {
      getFollowingLikes(user._id);
    } else {
      setRenderedPosts(posts);
    }
    setUser(userProfile);
  }, [userProfile]);

  const getFollowingLikes = async (userId: any) => {
    const response = await axios.get(`${BASE_URL}/api/feed/${userId}`);

    if (response.status === 200) {
      setRenderedPosts(response.data);
    }
  };

  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-black">
      <Navbar setRender={setRender} />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1">
          <div className="flex flex-col gap-10 h-full pt-3">
            {renderedPosts.map((post: Like, idx: number) => {
              let liked = false;
              let check = "";
              if (userProfile) {
                check = checkIfAlreadyLiked(userProfile._id, userLikes);
              }

              if (check.length > 0) {
                liked = true;
              }

              if (post.type === "song") {
                return (
                  <div className="flex flex-col border-b-2 border-gray3 pb-6">
                    <UserBadge
                      location="feed"
                      post={post.type}
                      date={post._createdAt}
                      user={post.likedBy}
                    />
                    <SongCard post={post} alreadyLiked={liked} key={idx} />
                  </div>
                );
              } else if (post.type === "album") {
                return (
                  <div className="flex flex-col border-b-2 border-gray3 pb-6">
                    <UserBadge
                      location="feed"
                      post={post.type}
                      date={post._createdAt}
                      user={post.likedBy}
                    />
                    <AlbumCard post={post} alreadyLiked={liked} key={idx} />
                  </div>
                );
              } else if (post.type === "artist") {
                return (
                  <div className="flex flex-col border-b-2 border-gray3 pb-6">
                    <UserBadge
                      location="feed"
                      post={post.type}
                      date={post._createdAt}
                      user={post.likedBy}
                    />
                    <ArtistCard post={post} alreadyLiked={liked} key={idx} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get(`${BASE_URL}/api/feed`);

  return {
    props: { posts: response.data },
  };
};

export default Home;
