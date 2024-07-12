import ProfileHeader from "@/components/common/HeadImage";
import BackHeader from "../BackHeader";
import { useEffect, useState } from "react";
import { Profile, RelationshipResponse } from "@/utils/type/post";

export interface ProfileHeadProps {
  data: { profile: Profile; relationship: RelationshipResponse };
  isYours: boolean;
}

export default function ProfileHead({
  data,
  isYours,
}: Readonly<ProfileHeadProps>) {
  const [follow, setFollow] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      console.log("data", data);
      setFollow(data?.relationship.isFollow ? true : false);
    }
  }, [data]);

  return (
    <>
      <BackHeader headTitle={data.profile.firstName} />
      <ProfileHeader
        onFollowClicked={() => {
          setFollow(!follow);
        }}
        profile={data.profile}
        follow={isYours ? "none" : follow ? "following" : "follow"}
      />
    </>
  );
}
