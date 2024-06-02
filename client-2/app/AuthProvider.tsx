"use client";

import CenteredElement from "@/components/common/CenteredElement";
import Loading from "@/components/common/Loading";
import apiConfig from "@/config/apiConfig";
import { setToken } from "@/lib/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios, { AxiosInstance } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const authInstance: { axios?: AxiosInstance } = {};

const whiteList = ["/login", "/"];

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stateToken = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (!stateToken) {
      console.log("in auth: setToken");
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setToken(token));
        setLoading(false);
      } else if (whiteList.includes(pathname)) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    }
  }, [dispatch, pathname, stateToken]);

  if (loading) {
    return (
      <CenteredElement>
        <Loading text="Loading..." />
      </CenteredElement>
    );
  }
  return <div>{children}</div>;
}
