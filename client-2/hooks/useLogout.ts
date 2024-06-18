import { logout, setToken } from "@/lib/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/auth/login");
  };
};

export default useLogout;
