import apiConfig from "@/config/apiConfig";
import { get } from "@/utils/api";
import { Profile } from "@/utils/type/post";

const getProfile = async (token: string): Promise<Profile> => {
  const data = await get(apiConfig.endpoints.getProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

const getProfileByProfileId = async (profileId: string): Promise<Profile> => {
  const data = await get(apiConfig.endpoints.getProfileById(profileId));
  return data.data;
};

export { getProfile, getProfileByProfileId };
