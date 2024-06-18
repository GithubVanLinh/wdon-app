"use client";

import CenteredElement from "@/components/common/CenteredElement";
import Loading from "@/components/common/Loading";
import apiConfig from "@/config/apiConfig";
import { setProfile, setToken } from "@/lib/feature/auth/authSlice";
import { setTab } from "@/lib/feature/feed/feedSlice";
import { setCurrent } from "@/lib/feature/message/messageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Profile } from "@/utils/type/post";
import axios, { AxiosInstance } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const authInstance: { axios?: AxiosInstance } = {};

const whiteList = ["/auth/login", "/auth/register", "/"];

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  const notify = useAppSelector((state) => state.app.notify);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stateToken = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const rootRouter = pathname.split("/")[1];
  useEffect(() => {
    if (rootRouter) {
      console.log("current", rootRouter);
      dispatch(setTab(rootRouter));
    }
  }, [dispatch, rootRouter]);
  useEffect(() => {
    if (!stateToken) {
      console.log("in auth: setToken");
      const token = localStorage.getItem("token");
      const strProfile = localStorage.getItem("profile");
      if (token && strProfile) {
        const profile = JSON.parse(strProfile) as Profile;
        dispatch(setToken(token));
        dispatch(setProfile(profile));
        setLoading(false);
      } else if (whiteList.includes(pathname)) {
        setLoading(false);
      } else {
        router.push("/auth/login");
      }
    }
  }, [router, dispatch, pathname, stateToken]);

  if (loading) {
    return (
      <CenteredElement>
        <Loading text="Loading..." />
      </CenteredElement>
    );
  }
  return (
    <div>
      {notify && (
        <div className="fixed border bg-blue-300 flex justify-center items-center rounded-full bottom-2 right-2 z-50 w-1/6 h-20">
          notify
        </div>
      )}
      {children}
    </div>
  );
}
