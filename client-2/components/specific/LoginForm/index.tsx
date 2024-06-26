"use client";

import Button from "@/components/common/Button";
import { setProfile, setToken } from "@/lib/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/services/authService";
import { getProfile } from "@/services/userService";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export interface LoginFormProps {}

export default function LoginForm({}: Readonly<LoginFormProps>) {
  const [data, setData] = useState<{
    username: string;
    password: string;
    error?: string;
  }>({ username: "", password: "", error: undefined });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(data.username, data.password);
      const profile = await getProfile(res.access_token);
      console.log("profile", profile);
      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("token", res.access_token);
      dispatch(setToken(res.access_token));
      dispatch(setProfile(profile));
      router.replace("/feed");
    } catch (error) {
      if (error instanceof AxiosError) {
        setData({
          error: error.message,
          username: data.username,
          password: "",
        });
      } else {
        setData({
          error: "Something went wrong",
          username: data.username,
          password: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 border py-10 px-4"
    >
      <div className="w-full text-center font-bold text-xl">Login</div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <UserCircleIcon width={20} height={20} />
        </div>
        <input
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value, error: undefined });
          }}
          type="text"
          name="username"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="username"
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <LockClosedIcon width={20} height={20} />
        </div>
        <input
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value, error: undefined });
          }}
          type="password"
          name="password"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="password"
        />
      </div>
      {data.error && <div className="text-red-600">{data.error}</div>}
      <Button
        type="submit"
        className="text-white hover:bg-blue-600 transition-colors duration-500 bg-blue-400 font-bold text-lg"
        loading={loading}
      >
        Login
      </Button>
    </form>
  );
}
