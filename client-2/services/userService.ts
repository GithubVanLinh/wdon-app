import apiConfig from "@/config/apiConfig";
import { get, post } from "@/utils/api";
import { Profile, RelationshipResponse } from "@/utils/type/post";

const getProfile = async (token: string): Promise<Profile> => {
  const data = await get(apiConfig.endpoints.getProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

const getProfileByProfileId = async (
  profileId: string
): Promise<{ profile: Profile; relationship: RelationshipResponse }> => {
  const data = await get(apiConfig.endpoints.getProfileById(profileId));
  console.log("data", data);
  return data.data;
};

const follow = async (id: string) => {
  const data = await post(apiConfig.endpoints.follow, { friend_id: id });
  return data;
};

const unfollow = async (id: string) => {
  const data = await post(apiConfig.endpoints.unfollow, { friend_id: id });
  return data;
};

export { getProfile, getProfileByProfileId, follow, unfollow };
