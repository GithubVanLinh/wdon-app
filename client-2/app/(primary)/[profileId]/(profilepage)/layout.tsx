"use client";

import ProfileHeader from "@/components/common/HeadImage";
import Loading from "@/components/common/Loading";
import StickyArea from "@/components/common/StickyArea";
import Tab from "@/components/common/Tab";
import BackHeader from "@/components/specific/BackHeader";
import { useProfile } from "@/hooks/useProfile";
import useService from "@/hooks/useService";
import { useAppSelector } from "@/lib/hooks";
import { getProfileByProfileId } from "@/services/userService";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface PageProps {
  children: ReactNode;
  params: {
    profileId: string;
  };
}

export default function Page({
  params: { profileId },
  children,
}: Readonly<PageProps>) {
  const profile = useAppSelector((state) => state.auth.profile);
  const isYours = profileId == profile?._id;
  const { data, error, loading } = useService(getProfileByProfileId, profileId);

  const [follow, setFollow] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      setFollow(data?.relationship.isFollow ? true : false);
    }
  }, [data]);

  const pathname = usePathname();
  let curTab = "post";
  if (pathname.includes("comment")) {
    curTab = "comment";
  }
  if (pathname.includes("like")) {
    curTab = "like";
  }
  if (pathname.includes("media")) {
    curTab = "media";
  }
  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const { profile: pData, relationship } = data;
    return (
      <div className="flex flex-row w-full">
        <div className="flex flex-col grow shrink basis-0 border-x">
          <BackHeader headTitle={pData?.firstName} />
          <ProfileHeader
            onFollowClicked={() => {
              setFollow(!follow);
            }}
            profile={pData}
            follow={isYours ? "none" : follow ? "following" : "follow"}
          />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Tab
                selected={curTab === "post"}
                title="Posts"
                href={`/${profileId}`}
              />
              <Tab
                selected={curTab === "comment"}
                title="Comments"
                href={`/${profileId}/comment`}
              />
              <Tab
                selected={curTab === "media"}
                title="Media"
                href={`/${profileId}/media`}
              />
              <Tab
                selected={curTab === "like"}
                title="Like"
                href={`/${profileId}/like`}
              />
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div className="xl:flex flex-col shrink basis-0 grow hidden">
          <StickyArea>Right</StickyArea>
        </div>
      </div>
    );
  }
}
