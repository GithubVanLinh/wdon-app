"use client";

import FeedLeftSide from "@/components/specific/FeedLeftSide";
import FeedRightSide from "@/components/specific/FeedRightSide";
import { useAppSelector } from "@/lib/hooks";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const currentTabState = useAppSelector((state) => state.feed.currentTab);
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="hidden sm:flex sm:flex-row bg-white sticky top-0 basis-0 grow shrink h-screen justify-end">
          <FeedLeftSide
            currentTab={currentTabState}
            className="flex w-10/12 h-full"
          />
        </div>
        <div className="flex grow-3 shrink basis-0 gap-6">{children}</div>
      </div>
    </div>
  );
}
