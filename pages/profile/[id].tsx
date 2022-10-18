import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { BASE_URL, checkIfAlreadyFollowing } from "../../utils";
import { checkIfAlreadyLiked } from "../../utils";
import SongCard from "../../components/SongCard";
import ArtistCard from "../../components/ArtistCard";
import AlbumCard from "../../components/AlbumCard";
import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import UserBadge from "../../components/UserBadge";
import Sidebar from "../../components/Sidebar";
import FollowButton from "../../components/FollowButton";

interface IProps {
  user: any;
}

const Profile = ({ user }: IProps) => {
  const { userLikes, userProfile, fetchUserLikes, userFollowers } =
    useAuthStore();
  const [currUser, setUser] = useState(userProfile);
  const [tab, setTab] = useState("likes");

  useEffect(() => {
    if (currUser) {
      fetchUserLikes(user._id);
    }
  }, [currUser, fetchUserLikes, user._id]);

  const likesTab = tab === "likes" ? "border-b-2 border-white" : "text-gray3";
  const followingTab =
    tab === "following" ? "border-b-2 border-white" : "text-gray3";
  const followersTab =
    tab === "followers" ? "border-b-2 border-white" : "text-gray3";

  let followed = false;
  if (userProfile) {
    followed = checkIfAlreadyFollowing(
      userProfile._id,
      userFollowers
    );
  }

  return (
    <div className="flex gap-6 md:gap-20">
      <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
        <Sidebar />
      </div>
      <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] pr-5 flex-1">
        <div className="w-full">
          <div className="mb-5">
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
              <div className="md:w-16 md:h-16 w-10 h-10">
                <Link href={`/profile/${user._id}`}>
                  <div className="m-0 p-0">
                    <Image
                      width={62}
                      height={62}
                      className="rounded-full"
                      src={user.image}
                      alt="profile photo"
                      layout="responsive"
                    />
                  </div>
                </Link>
              </div>
              <div>
                <Link href={`/`}>
                  <div className="flex items-center gap-2">
                    <p className="flex gap-2 text-lg items-center font-bold">
                      {user.userName}
                      <GoVerified className="text-[#1FB954] text-md" />
                    </p>
                    <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                      {user.userName}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex justify-end">
              {userProfile && user._id !== userProfile._id && (
                <FollowButton
                  userId={user._id}
                  following={followed}
                  location="profile"
                />
              )}
            </div>
          </div>

          <div className="flex sm:gap-10 gap-6 mb-10 border-b-2 border-gray3 w-full">
            <p
              className={`sm:text-xl text-lg font-semibold cursor-pointer mt-2 ${likesTab}`}
              onClick={() => setTab("likes")}
            >
              Likes
            </p>
            <p
              className={`sm:text-xl text-lg font-semibold cursor-pointer mt-2 ${followersTab}`}
              onClick={() => setTab("followers")}
            >
              Followers
            </p>
            <p
              className={`sm:text-xl text-lg font-semibold cursor-pointer mt-2 ${followingTab}`}
              onClick={() => setTab("following")}
            >
              Following
            </p>
          </div>

          {tab === "likes" &&
            (user.likes.length > 0 ? (
              user.likes.map((like: any, idx: number) => {
                const type = like.type;
                let liked = false;
                const alreadyLikedId = checkIfAlreadyLiked(like, userLikes);

                if (alreadyLikedId.length > 0) {
                  like._id = alreadyLikedId;
                  liked = true;
                }

                if (type === "song") {
                  return (
                    <div
                      key={idx}
                      className="md:mt-16 mt-10 flex flex-col gap-6 justify-start sm:items-start items-center"
                    >
                      <p className="text-lg text-neutral-500">{`Liked this ${
                        like.type
                      } ${moment(like._createdAt).fromNow()}`}</p>
                      <SongCard
                        post={like}
                        alreadyLiked={liked}
                        key={idx}
                        location="profile"
                      />
                    </div>
                  );
                } else if (type === "artist") {
                  return (
                    <div
                      key={idx}
                      className="md:mt-16 mt-10 flex flex-col gap-6 justify-start sm:items-start items-center"
                    >
                      <p className="text-lg text-neutral-500">{`Liked this ${
                        like.type
                      } ${moment(like._createdAt).fromNow()}`}</p>
                      <ArtistCard
                        post={like}
                        alreadyLiked={liked}
                        key={idx}
                        location="profile"
                      />
                    </div>
                  );
                } else if (type === "album") {
                  return (
                    <div
                      key={idx}
                      className="md:mt-16 mt-10 flex flex-col gap-6 justify-start sm:items-start items-center"
                    >
                      <p className="text-lg text-neutral-500">{`Liked this ${
                        like.type
                      } ${moment(like._createdAt).fromNow()}`}</p>
                      <AlbumCard
                        post={like}
                        alreadyLiked={liked}
                        key={idx}
                        location="profile"
                      />
                    </div>
                  );
                }
              })
            ) : (
              <NoResults text={"No Likes"} />
            ))}

          {tab === "followers" &&
            (user.followers.length > 0 ? (
              user.followers.map((user: any, idx: number) => {
                let followed = false;
                if (userProfile) {
                  followed = checkIfAlreadyFollowing(userProfile._id, userFollowers);
                }

                return (
                  <UserBadge
                    key={idx}
                    user={user}
                    location="search"
                    following={followed}
                  />
                );
              })
            ) : (
              <NoResults text={"No Likes"} />
            ))}

          {tab === "following" &&
            (user.following.length > 0 ? (
              user.following.map((user: any, idx: number) => {
                let followed = false;
                if (userProfile) {
                  followed = checkIfAlreadyFollowing(userProfile._id, userFollowers);
                }

                return (
                  <UserBadge
                    key={idx}
                    user={user}
                    location="search"
                    following={followed}
                  />
                );
              })
            ) : (
              <NoResults text={"No Likes"} />
            ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { user: res.data[0] },
  };
};

export default Profile;
