import React, { useState } from "react";
import axios from "axios";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";

interface IProps {
  following: boolean;
  userId: string;
  location: string;
}

const FollowButton = ({ following, userId, location }: IProps) => {
  const { userProfile, fetchUserFollowers }: any = useAuthStore();
  const [followed, setFollowed] = useState(following);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    const response = await axios.put(`${BASE_URL}/api/follow`, {
      currUser: userProfile._id,
      userToFollow: userId,
      follow: followed,
    });

    fetchUserFollowers(userProfile._id);
    setLoading(false);

    followed ? setFollowed(false) : setFollowed(true);
  };

  const suggestedStyles1 =
    location === "suggested"
      ? "bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-700 hidden md:block cursor-pointer"
      : "";
  const suggestedStyles2 =
    location === "suggested"
      ? "flex text-lg font-semibold items-center gap-2 text-[#1FB954]"
      : "";
  const searchStyles1 =
    location === "search"
      ? "bg-neutral-600 md:mr-5 mr-2 md:px-3 md:py-2 py-1 px-2 rounded hover:bg-neutral-700 cursor-pointer"
      : "";
  const searchStyles2 =
    location === "search"
      ? "flex md:text-lg text-sm font-semibold items-center gap-2 text-[#1FB954]"
      : "";
  const profileStyles1 =
    location === "profile"
      ? "bg-neutral-600 md:mr-5 mr-2 md:px-3 md:py-2 py-2 px-3 rounded hover:bg-neutral-700 cursor-pointer"
      : "";
  const profileStyles2 =
    location === "profile"
      ? "flex md:text-xl text-md font-semibold items-center gap-2 text-[#1FB954]"
      : "";

  return (
    <>
      {loading ? (
        <div
          className={`${suggestedStyles1} ${searchStyles1} ${profileStyles1}`}
          onClick={handleFollow}
        >
          <p className={`${suggestedStyles2} ${searchStyles2} ${profileStyles2}`}>Loading...</p>
        </div>
      ) : !followed ? (
        <div
          className={`${suggestedStyles1} ${searchStyles1} ${profileStyles1}`}
          onClick={handleFollow}
        >
          <p className={`${suggestedStyles2} ${searchStyles2} ${profileStyles2}`}>
            <RiUserFollowLine className="md:text-2xl text-sm" />
            Follow
          </p>
        </div>
      ) : (
        <div
          className={`${suggestedStyles1} ${searchStyles1} ${profileStyles1}`}
          onClick={handleFollow}
        >
          <p className={`${suggestedStyles2} ${searchStyles2} ${profileStyles2}`}>
            <RiUserUnfollowLine className="md:text-2xl text-sm text-red-500" />
            Unfollow
          </p>
        </div>
      )}
    </>
  );
};

export default FollowButton;
