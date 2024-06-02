import Avatar from "@/components/common/Avatar";
import { Profile } from "@/utils/type/post";
import UserLink from "../UserLink";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export interface UserInfoProps {
  user: Profile;
}

export default function UserInfo({ user }: Readonly<UserInfoProps>) {
  return (
    <div className="flex flex-row grow justify-between items-center rounded-full hover:bg-gray-200 p-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col justify-center items-center">
          <Avatar src="https://pbs.twimg.com/media/GOjEoGiaIAAw2_z?format=jpg&name=small" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="font-bold truncate">
            {user.firstName || "Anomyous"}
          </div>
          <UserLink text={user.link} />
        </div>
      </div>
      <div className="flex flex-row justify-end items-start">
        <EllipsisHorizontalIcon width={20} height={20} />
      </div>
    </div>
  );
}
