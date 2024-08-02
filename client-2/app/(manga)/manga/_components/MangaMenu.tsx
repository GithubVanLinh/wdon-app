"use client";

import ImageButton from "@/components/common/ImageButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export interface MangaMenuProps {
  open: boolean;
  onCloseClicked: () => void;
}

export default function MangaMenu({
  open,
  onCloseClicked,
}: Readonly<MangaMenuProps>) {
  if (open) {
    window.document.body.style.overflow = "hidden";
  } else {
    window.document.body.style.overflow = "auto";
  }

  return (
    <div
      className={
        "overflow-hidden bg-black/50 z-10 w-full h-screen top-0 left-0 flex flex-row transition-all duration-300 fixed" +
        (open ? " visible opacity-100" : " invisible opacity-0")
      }
    >
      <div
        className={
          "bg-slate-800 flex flex-col  text-white transition-all duration-300" +
          (open ? " w-full  sm:w-1/2 md:w-1/4" : " w-0")
        }
      >
        <div className="bg-blue-900 p-2 h-14">
          <ImageButton
            onClick={(e) => {
              e.preventDefault();
              onCloseClicked();
            }}
            image={<Bars3Icon width={30} height={30} />}
            hover={{ bg: "hover:bg-blue-700" }}
          />
        </div>
      </div>
    </div>
  );
}
