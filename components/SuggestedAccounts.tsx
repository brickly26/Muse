import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from 'react-icons/go';

import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="lg:border-b-2 border-gray3">
      <p className="text-gray-200 font-semibold m-3 mt-4 hidden lg:block">
        Suggested Accounts
      </p>

      <div>
        {allUsers.slice(0, 5).map((user: IUser, idx: number) => (
          <Link href={`/profile/${user._id}`} key={idx}>
            <div className="flex gap-3 hover:bg-primary bg-gray2 mb-2 p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image 
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="user Profile"
                  layout="responsive"
                />
              </div>
              <div className="hidden lg:block">
                <p className="flex gap-1 items-center text-md font-bold lowercase">
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified />
                </p>
                <p className="capitalize text-gray-500 text-xs">
                  {user.userName}
                </p>
              </div>
              <div>
                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
