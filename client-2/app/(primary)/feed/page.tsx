"use client";

import CenteredElement from "@/components/common/CenteredElement";
import StickyArea from "@/components/common/StickyArea";
import CreatePostForm from "@/components/specific/CreatePostForm";
import PostCard from "@/components/specific/PostCard";
import { getPosts } from "@/services/postService";
import { Post } from "@/utils/type/post";
import { useEffect, useState } from "react";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const [listPost, setListPost] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setListPost(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex grow flex-col border-r border-l border-gray-200">
      <StickyArea className="flex flex-row w-full justify-center items-center divide-x border-b">
        <CenteredElement>
          <div className="py-4">For you</div>
        </CenteredElement>
        <CenteredElement>
          <div className="py-4s">Following</div>
        </CenteredElement>
      </StickyArea>
      <div className="grow divide-y">
        <CreatePostForm />
        {listPost.map((it) => (
          <PostCard key={it._id} post={it} />
        ))}
      </div>
    </div>
  );
}
