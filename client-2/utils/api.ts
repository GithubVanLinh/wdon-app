import { authInstance } from "@/app/AuthProvider";
import apiConfig from "@/config/apiConfig";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiRequest = () => {
  const instance =
    authInstance.axios ||
    axios.create({
      headers: apiConfig.headers,
      baseURL: apiConfig.baseURL,
      timeout: 5000,
    });
  return instance;
};

const get = async (endpoint: string, options: AxiosRequestConfig = {}) => {
  return (await apiRequest().get(endpoint, options)).data;
};

const post = async (
  endpoint: string,
  data: any,
  options: AxiosRequestConfig = {}
) => {
  try {
    return (await apiRequest().post(endpoint, data, options)).data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const put = async (
  endpoint: string,
  data: any,
  options: AxiosRequestConfig = {}
) => {
  return (await apiRequest().put(endpoint, data, options)).data;
};

const del = async (endpoint: string, options: AxiosRequestConfig = {}) => {
  return (await apiRequest().delete(endpoint, options)).data;
};

export { get, post, put, del };
