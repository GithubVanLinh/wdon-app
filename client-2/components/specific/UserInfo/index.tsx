"use client";

import Avatar from "@/components/common/Avatar";
import { Profile } from "@/utils/type/post";
import UserLink from "../UserLink";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { BASE_AVATAR_URL } from "@/utils/const";
import Menu from "@/components/common/Menu";
import List from "@/components/common/List";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { useAppDispatch } from "@/lib/hooks";

export interface UserInfoProps {
  user: Profile;
}

export default function UserInfo({ user }: Readonly<UserInfoProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logout = useLogout();

  return (
    <div className="flex flex-row grow justify-between items-center rounded-full hover:bg-gray-200 p-2 min-w-0">
      <div className="flex flex-row gap-4 min-w-0">
        <div className="flex flex-col justify-center items-center">
          <Avatar src={user.avatar || BASE_AVATAR_URL} />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="font-bold truncate">
            {user.firstName || "Anomyous"}
          </div>
          <UserLink text={user.link} />
        </div>
      </div>
      <div className="flex flex-row justify-end items-start relative">
        <Menu
          menu={
            <>
              <button
                onClick={() => {
                  logout();
                }}
                className="hover:bg-gray-200 w-full p-2 text-start"
              >
                Log out
              </button>
              <button className="hover:bg-gray-200 w-full p-2 text-start">
                Add another account
              </button>
            </>
          }
        >
          <EllipsisHorizontalIcon width={20} height={20} />
        </Menu>
      </div>
    </div>
  );
}
