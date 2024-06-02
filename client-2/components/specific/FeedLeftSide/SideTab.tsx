"use client";

import ImageButton from "@/components/common/ImageButton";
import { FeedTab, setTab } from "@/lib/feature/feed/feedSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export interface SideTabProps {
  icon: ReactNode;
  selectedIcon?: ReactNode;
  selected: boolean;
  name: string;
  path: string;
}

export default function SideTab({
  icon,
  selectedIcon = icon,
  selected = false,
  name,
  path,
}: Readonly<SideTabProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const className = selected ? "font-bold" : "";

  return (
    <ImageButton
      className={className}
      onClick={() => {
        if (!selected) {
          dispatch(setTab(name.toLowerCase() as FeedTab));
          router.push(path);
        }
      }}
      text={name}
      image={selected ? selectedIcon : icon}
    />
  );
}
