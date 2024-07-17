"use client";

import CenteredElement from "@/components/common/CenteredElement";
import Loading from "@/components/common/Loading";
import StickyArea from "@/components/common/StickyArea";
import CreatePostForm from "@/components/specific/CreatePostForm";
import PostCard from "@/components/specific/PostCard";
import { setPosts } from "@/lib/feature/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getPosts } from "@/services/postService";
import { Post } from "@/utils/type/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const posts = useAppSelector((state) => state.post.posts);
  const profile = useAppSelector((state) => state.auth.profile);
  console.log("profile", profile);
  const [error, setError] = useState<AxiosError>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        dispatch(setPosts(data));
      } catch (error) {
        console.log(error);
        setError(error as AxiosError);
      }
    };
    fetchData();
  }, [dispatch]);

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  return (
    <div className="flex grow flex-col border-gray-100 border-r border-l">
      <StickyArea className="flex flex-row w-full justify-center items-center divide-gray-100 divide-x border-b border-gray-100 bg-white">
        <CenteredElement>
          <div className="py-4">For you</div>
        </CenteredElement>
        <CenteredElement>
          <div className="py-4s">Following</div>
        </CenteredElement>
      </StickyArea>
      <div className="grow divide-y divide-gray-100">
        <CreatePostForm avatar={profile?.avatar} />

        {posts ? (
          posts.map((it) => (
            <PostCard
              onClick={() => {
                router.push(`/${it.profile._id}/status/${it._id}`);
              }}
              key={it._id}
              post={it}
            />
          ))
        ) : (
          <Loading text="Loading..." />
        )}
      </div>
    </div>
  );
}
