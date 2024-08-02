"use client";

import { ReactNode, useState } from "react";
import MangaHead from "./_components/Header";
import ImageButton from "@/components/common/ImageButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MangaMenu from "./_components/MangaMenu";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const [menuOpen, setMenuopen] = useState(false);

  const handleMenuClicked = async () => {
    setMenuopen(true);
  };
  const handleCloseMenuClicked = async () => {
    setMenuopen(false);
  };
  return (
    <div className="bg-slate-800 min-h-screen w-full">
      <MangaHead onMenuClicked={handleMenuClicked} />
      {children}
      <MangaMenu open={menuOpen} onCloseClicked={handleCloseMenuClicked} />
    </div>
  );
}
