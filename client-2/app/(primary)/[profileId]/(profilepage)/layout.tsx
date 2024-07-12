"use client";

import ProfileHeader from "@/components/common/HeadImage";
import Loading from "@/components/common/Loading";
import LoadingAndError from "@/components/common/LoadingAndError";
import StickyArea from "@/components/common/StickyArea";
import Tab from "@/components/common/Tab";
import BackHeader from "@/components/specific/BackHeader";
import ProfileHead from "@/components/specific/ProfileHead";
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
      console.log("data", data);
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

  return (
    <LoadingAndError error={error} loading={loading}>
      <div className="flex flex-row w-full">
        <div className="flex flex-col grow shrink basis-0 border-x">
          <ProfileHead data={data} isYours={isYours} />
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
    </LoadingAndError>
  );
}
