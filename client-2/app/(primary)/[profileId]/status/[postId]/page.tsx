"use client";

import ImageButton from "@/components/common/ImageButton";
import Loading from "@/components/common/Loading";
import StickyArea from "@/components/common/StickyArea";
import PostCard from "@/components/specific/PostCard";
import { getPost } from "@/services/postService";
import { AxiosErrorState } from "@/utils/type/error";
import { Post } from "@/utils/type/post";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface PageProps {
  params: {
    profileId: string;
    postId: string;
  };
}

export default function Page({
  params: { profileId, postId },
}: Readonly<PageProps>) {
  const [post, setPost] = useState<Post | undefined>();
  const [error, setError] = useState<AxiosErrorState | undefined>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(postId);
        setPost(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError({ code: e.response?.status, message: e.response?.data });
        }
      }
    };

    fetchData();
  });

  if (!post) {
    if (error)
      return (
        <div>
          {error.code}: {error.message}
        </div>
      );
    return <Loading />;
  }
  return (
    <div className="border-l border-r w-full">
      <StickyArea className="p-2 border-b  bg-white">
        <div className="flex flex-row justify-start items-center gap-4">
          <ImageButton
            onClick={() => {
              router.back();
            }}
            image={<ArrowLeftIcon width={20} height={20} />}
          />
          <h1 className="text-lg font-bold">Post</h1>
        </div>
      </StickyArea>
      <PostCard post={post} />
    </div>
  );
}
