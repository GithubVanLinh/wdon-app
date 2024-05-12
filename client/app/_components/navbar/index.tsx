"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "..";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hook";
import { loging, setAvatar } from "@/app/_lib/features/user/logged";
import { HomeIcon } from "./home-icon";
import { FriendIcon } from "./friend-icon";
import { NavContainer } from "./container";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { PersonalDropdown } from "./personal-dropdown";
import { HOME_PAGE_TARGET, TARGET_PAGE } from "./const";
import { chooseFriend, chooseHome } from "@/app/_lib/features/home/dashboard";

export function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const logged = useAppSelector((state) => state.user.logged);
  const chooseDashboard = useAppSelector((state) => state.dashboard.target);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    const tk = localStorage.getItem("token");
    const avatar = localStorage.getItem("avatar") ?? "/person.svg";
    const targetPage = localStorage.getItem(TARGET_PAGE) ?? HOME_PAGE_TARGET;
    console.log("tk", tk);
    if (tk) {
      dispatcher(loging(tk));
      dispatcher(setAvatar(avatar));
      if (targetPage === HOME_PAGE_TARGET) {
        dispatcher(chooseHome());
      } else {
        dispatcher(chooseFriend());
      }
    }
  }, [dispatcher]);

  if (!logged) {
    return <></>;
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 p-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <AppIcon />
          <div className="flex md:order-2">
            <PersonalDropdown />
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <NavContainer>
              <HomeIcon choose={chooseDashboard === "home"} />
              <FriendIcon choose={chooseDashboard === "friend"} />
            </NavContainer>
          </div>
        </div>
      </nav>

      <div style={{ height: "54px" }} className="my-4" />
    </>
  );
}
