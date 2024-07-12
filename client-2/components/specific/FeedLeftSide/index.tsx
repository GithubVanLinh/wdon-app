"use client";

import { DivProps } from "@/utils/type/html";
import Logo from "../Logo";
import ImageButton from "@/components/common/ImageButton";
import {
  BellIcon,
  CubeIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  BellIcon as BellIconSolid,
  CubeIcon as CubeIconSolid,
  EllipsisHorizontalIcon as EllipsisHorizontalIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  XMarkIcon as XMarkIconSolid,
} from "@heroicons/react/24/solid";
import Button from "@/components/common/Button";
import UserInfo from "../UserInfo";
import Link from "next/link";
import { FeedTab } from "@/lib/feature/feed/feedSlice";
import SideTab from "./SideTab";
import { useAppSelector } from "@/lib/hooks";
import { useProfile } from "@/hooks/useProfile";

export interface FeedLeftSideProps {
  currentTab: FeedTab;
}

export default function FeedLeftSide({
  currentTab,
  ...res
}: Readonly<FeedLeftSideProps & DivProps>) {
  const [profile, errorLoad] = useProfile();

  if (profile) {
    return (
      <div {...res}>
        <div className="flex flex-col justify-between p-2 min-w-0">
          <div className="flex flex-col items-center xl:items-start">
            <div className="p-2 flex">
              <Logo />
            </div>
            <SideTab
              selected={currentTab === "home"}
              path="/feed"
              name="Home"
              icon={<HomeIcon width={30} height={30} />}
              selectedIcon={<HomeIconSolid width={30} height={30} />}
            />
            <SideTab
              selected={currentTab === "search"}
              path="/search"
              name="Search"
              icon={<MagnifyingGlassIcon width={30} height={30} />}
              selectedIcon={
                <MagnifyingGlassIcon strokeWidth={2} width={30} height={30} />
              }
            />
            <SideTab
              selected={currentTab === "notifications"}
              path="/notifications"
              name="Notifications"
              icon={<BellIcon width={30} height={30} />}
            />
            <SideTab
              selected={currentTab === "message"}
              path="/message"
              name="Message"
              selectedIcon={
                <EnvelopeIconSolid strokeWidth={2} width={30} height={30} />
              }
              icon={<EnvelopeIcon width={30} height={30} />}
            />
            <SideTab
              selected={currentTab === "cube"}
              path="/cube"
              name="Cube"
              icon={<CubeIcon width={30} height={30} />}
            />
            <SideTab
              selected={currentTab === "communications"}
              path="/communications"
              name="Communications"
              icon={<UserGroupIcon width={30} height={30} />}
            />
            <ImageButton
              text="Premium"
              image={<XMarkIcon width={30} height={30} />}
            />
            <SideTab
              selected={currentTab === "profile"}
              path="/profile"
              name="Profile"
              icon={<UserIcon width={30} height={30} />}
            />
            <ImageButton
              text="More"
              image={<EllipsisHorizontalIcon width={30} height={30} />}
            />
            <Link
              href="/post"
              scroll={false}
              className="hidden lg:flex bg-blue-400 text-lg font-bold text-white p-2 rounded-full text-center justify-center items-center"
            >
              Post
            </Link>
          </div>
          <div className="flex flex-row">
            {profile && <UserInfo user={profile} />}
          </div>
        </div>
      </div>
    );
  }
}
