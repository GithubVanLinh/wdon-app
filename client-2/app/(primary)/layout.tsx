import FeedLeftSide from "@/components/specific/FeedLeftSide";
import FeedRightSide from "@/components/specific/FeedRightSide";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="hidden sm:flex bg-white relative sticky top-0 basis-0 grow shrink h-screen flex-end">
          <FeedLeftSide className="flex absolute top-0 left-1/4 h-full grow shrink " />
        </div>
        <div className="flex grow-3 shrink basis-0">
          <div className="flex grow max-w-screen-sm">{children}</div>
          <div className="hidden xl:flex grow sticky top-0 right-0 max-w-lg flex-start h-fit">
            <FeedRightSide className="w-9/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
