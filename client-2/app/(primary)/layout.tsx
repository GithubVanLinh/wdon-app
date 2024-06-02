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
        <div className="hidden sm:flex bg-white relative sticky top-0 basis-0 grow shrink h-screen flex-end">
          <FeedLeftSide
            currentTab={currentTabState}
            className="flex absolute top-0 left-1/4 h-full grow shrink "
          />
        </div>
        <div className="flex grow-3 shrink basis-0 gap-6">{children}</div>
      </div>
    </div>
  );
}
