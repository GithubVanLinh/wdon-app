"use client";

import Loading from "@/components/common/Loading";
import LoadingAndError from "@/components/common/LoadingAndError";
import UserInfo from "@/components/specific/UserInfo";
import useService from "@/hooks/useService";
import { getPost } from "@/services/postService";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  params: {
    profileId: string;
    postId: string;
    index: string;
  };
}

export default function Layout({
  params: { profileId, postId, index },
  children,
}: Readonly<LayoutProps>) {
  const { data, error, loading } = useService(getPost, postId);

  console.log("data layout", data);
  if (loading) return <Loading text="Loading.." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="fixed flex flex-row z-50 top-0 left-0 h-screen w-screen bg-black/90">
      <div className="flex grow shrink basis-0 relative">{children}</div>
      <div className="hidden xl:flex bg-white h-full basis-auto w-96 min-w-0">
        <LoadingAndError loading={loading} error={error}>
          <div className="flex flex-col p-4 min-w-0 w-full">
            {data && <UserInfo user={data.profile} />}
          </div>
        </LoadingAndError>
      </div>
    </div>
  );
}
