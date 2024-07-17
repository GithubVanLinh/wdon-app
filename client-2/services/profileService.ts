import apiConfig from "@/config/apiConfig";
import { post } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Profile } from "@/utils/type/post";

export type UpdateProfileDto = {
  background?: File;
  avatar?: File;
};

const updateProfile = async (data: UpdateProfileDto) => {
  const body = new FormData();
  if (data.avatar) {
    body.append("avatar", data.avatar);
  }
  if (data.background) {
    body.append("background", data.background);
  }
  const resp: ApiResponse<Profile> = await post(
    apiConfig.endpoints.updateProfile,
    body,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

  return resp.data;
};

export { updateProfile };
