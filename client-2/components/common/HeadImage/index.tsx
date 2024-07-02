import Image from "next/image";

import "./style.css";
import ImageButton from "../ImageButton";
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import UserLink from "@/components/specific/UserLink";
import Link from "next/link";
import { Profile } from "@/utils/type/post";
import { toLocalDate } from "@/utils/date";
import { follow as f, unfollow } from "../../../services/userService";

export interface ProfileHeaderProps {
  profile: Profile;
  follow: "follow" | "following" | "none";
  onFollowClicked?: () => void;
}

export default function ProfileHeader({
  profile: { _id, avatar, background, createdAt, firstName, link, dayOfBirth },
  onFollowClicked,
  follow = "none",
}: Readonly<ProfileHeaderProps>) {
  const handleFollowClick = async () => {
    if (follow === "follow") {
      const data = await f(_id);
    } else if (follow === "following") {
      const data = await unfollow(_id);
    }

    if (onFollowClicked) {
      onFollowClicked();
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-72 ">
        <Image
          alt="head"
          fill
          src={background}
          className="object-cover object-top"
        />
        <Image
          alt="avatar"
          className="absolute rounded-full border object-cover w-32 h-32 avatar ring-2 ring-white"
          width={100}
          height={100}
          src={avatar}
        />
      </div>
      <div className="flex flex-row justify-end h-16">
        {follow != "none" ? (
          <div className="flex flex-row justify-end h-fit m-2 gap-2">
            <ImageButton
              className="border"
              image={<EllipsisHorizontalIcon width={20} height={20} />}
            />
            <ImageButton
              className="border"
              image={<EnvelopeIcon width={20} height={20} />}
            />

            <button
              className="px-8 py-2  bg-blue-400 rounded-full text-white font-bold capitalize"
              onClick={handleFollowClick}
            >
              {follow}
            </button>
          </div>
        ) : (
          <Link
            href="#"
            className="m-2 border py-2 px-4 rounded-full justify-center items-center flex"
          >
            Edit profile
          </Link>
        )}
      </div>
      <div className="pl-6 mt-4 flex flex-col">
        <h1 className="font-bold text-xl">{firstName}</h1>
        <UserLink text={link} />
        <p>lorem ...</p>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="inline-flex flex-row">
            <MapPinIcon width={20} height={20} /> location
          </div>
          <div className="inline-flex flex-row">
            <CalendarIcon width={20} height={20} /> {toLocalDate(createdAt)}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Link href={"#"} className="hover:underline">
            <b>333</b> following
          </Link>
          <Link href={"#"} className="hover:underline">
            <b>333</b> followers
          </Link>
        </div>
        <div>More</div>
      </div>
    </div>
  );
}
