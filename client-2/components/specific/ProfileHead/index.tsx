import ProfileHeader from "@/components/common/HeadImage";
import BackHeader from "../BackHeader";
import { useEffect, useState } from "react";
import { Profile, RelationshipResponse } from "@/utils/type/post";
import { useAppSelector } from "@/lib/hooks";

export interface ProfileHeadProps {
  data: { profile: Profile; relationship: RelationshipResponse };
  isYours: boolean;
}

export default function ProfileHead({
  data,
  isYours,
}: Readonly<ProfileHeadProps>) {
  const [follow, setFollow] = useState<boolean>(false);
  const profileState = useAppSelector((state) => state.auth.profile);
  useEffect(() => {
    if (data) {
      setFollow(data?.relationship.isFollow ? true : false);
    }
  }, [data]);
  let profile = data.profile;
  if (isYours && profileState) {
    profile = profileState;
  }
  return (
    <>
      <BackHeader headTitle={profile.firstName} />
      <ProfileHeader
        onFollowClicked={() => {
          setFollow(!follow);
        }}
        profile={profile}
        follow={isYours ? "none" : follow ? "following" : "follow"}
      />
    </>
  );
}
