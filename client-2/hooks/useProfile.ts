import { Profile } from "@/utils/type/post";
import { useEffect, useState } from "react";

type ProfileState = [Profile | undefined, Error | undefined];

const useProfile = (): ProfileState => {
  const [profile, setProfile] = useState<Profile>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profileObj = JSON.parse(profileString);
      setProfile(profileObj);
    } else {
      setError(new Error("not found profile in localStorage"));
    }
  }, []);

  return [profile, error];
};

export { useProfile };
