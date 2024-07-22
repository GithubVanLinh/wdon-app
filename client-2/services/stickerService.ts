import apiConfig from "@/config/apiConfig";
import { get } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Sticker } from "@/utils/type/sticker";

const getAllStickers = async () => {
  const data: ApiResponse<Sticker[]> = await get(
    apiConfig.endpoints.getStickers
  );

  return data.data;
};

export { getAllStickers };
