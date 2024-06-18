import apiConfig from "@/config/apiConfig";
import { post } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Login, SignInData } from "@/utils/type/auth";

const login = async (username: string, password: string): Promise<Login> => {
  const data = await post(apiConfig.endpoints.login, {
    username,
    password,
  });
  return data.data;
};

const register = async (data: SignInData) => {
  try {
    const response = await post(apiConfig.endpoints.register, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { login, register };
