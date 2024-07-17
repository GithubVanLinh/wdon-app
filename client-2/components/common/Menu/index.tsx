"use client";

import { ReactNode, useState } from "react";

export interface MenuProps {
  children: ReactNode;
  menu: ReactNode;
}

export default function Menu({ children, menu }: Readonly<MenuProps>) {
  const [open, setOpen] = useState(false);
  const onOutsideClick = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };
  return (
    <>
      <div onClick={handleOpenMenu}>{children}</div>
      <div
        className={
          "transition-all duration-500 " +
          (open ? "visible opacity-100" : "invisible opacity-0")
        }
      >
        <div className="absolute bottom-4 left-0 w-80 border z-30 bg-white p-2 rounded-lg flex flex-col items-start">
          {menu}
        </div>
        <div
          onClick={onOutsideClick}
          className="fixed w-screen h-screen top-0 left-0 z-20"
        ></div>
      </div>
    </>
  );
}
