import FeedRightSide from "@/components/specific/FeedRightSide";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <>
      <div className="flex grow max-w-screen-sm">{children}</div>
      <div className="hidden xl:flex grow sticky top-0 right-0 max-w-lg flex-start h-fit">
        <FeedRightSide className="w-9/12" />
      </div>
    </>
  );
}
