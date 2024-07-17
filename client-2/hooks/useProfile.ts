import { setProfile } from "@/lib/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Profile } from "@/utils/type/post";
import { useEffect, useState } from "react";

const useProfile = () => {
  const dispatch = useAppDispatch();

  const updateProfile = (profile: Profile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
    dispatch(setProfile(profile));
  };

  return [updateProfile];
};

export { useProfile };
