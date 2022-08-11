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
  const [loading, setLoading] = useState(false)

  const handleFollow = async () => {
    setLoading(true)
    const response = await axios.put(`${BASE_URL}/api/follow`, {
      currUser: userProfile._id,
      userToFollow: userId,
      follow: followed,
    });

    fetchUserFollowers(userProfile._id);
    setLoading(false)

    followed ? setFollowed(false) : setFollowed(true);
  };

  const suggestedStyles1 =
    location === "suggested"
      ? "bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-00 hidden md:block cursor-pointer"
      : "";
  const suggestedStyles2 =
    location === "suggested"
      ? "flex text-lg font-semibold items-center gap-2 text-[#1FB954]"
      : "";
  const searchStyles1 =
    location === "search"
      ? "bg-neutral-600 mr-5 px-3 py-2 rounded hover:bg-neutral-700 cursor-pointer"
      : "";
  const searchStyles2 =
    location === "search"
      ? "flex text-lg font-semibold items-center gap-2 text-[#1FB954]"
      : "";

  return (
    <>
      {loading ? (
        <div
        className={`${suggestedStyles1} ${searchStyles1}`}
        onClick={handleFollow}
      >
        <p className={`${suggestedStyles2} ${searchStyles2}`}>
          Loading...
        </p>
      </div>
      ) : (
        !followed ? (
          <div
            className={`${suggestedStyles1} ${searchStyles1}`}
            onClick={handleFollow}
          >
            <p className={`${suggestedStyles2} ${searchStyles2}`}>
              <RiUserFollowLine className="text-2xl" />
              Follow
            </p>
          </div>
        ) : (
          <div
            className={`${suggestedStyles1} ${searchStyles1}`}
            onClick={handleFollow}
          >
            <p className={`${suggestedStyles2} ${searchStyles2}`}>
              <RiUserUnfollowLine className="text-2xl text-red-500" />
              Unfollow
            </p>
          </div>
        )
      )}
      
    </>
  );
};

export default FollowButton;
