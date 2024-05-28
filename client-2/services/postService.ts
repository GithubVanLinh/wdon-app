import apiConfig from "@/config/apiConfig";
import { get } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Post } from "@/utils/type/post";

const getPosts = async (): Promise<Array<Post>> => {
  const data = await get(apiConfig.endpoints.getPosts);
  return data.data;
};

const getPost = async (id: string): Promise<Post> => {
  const data: ApiResponse<Post> = await get(apiConfig.endpoints.getPost(id));
  return data.data;
};

export { getPosts, getPost };
