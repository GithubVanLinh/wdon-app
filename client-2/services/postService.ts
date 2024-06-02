import apiConfig from "@/config/apiConfig";
import { get, post } from "@/utils/api";
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

export type CreatePostDto = {
  files?: File[];
  content?: string;
  auth: string;
};
const createPost = async (data: CreatePostDto) => {
  const formData = new FormData();
  data.content && formData.append("content", data.content);
  formData.append("auth", data.auth);
  if (data.files) {
    for (const file of data.files) {
      formData.append("files", file);
    }
  }
  const response: ApiResponse<Post> = await post(
    apiConfig.endpoints.createPost,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export { getPosts, getPost, createPost };
