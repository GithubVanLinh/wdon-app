"use client";

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
    <div className="grow">
      {listPost.map((it) => (
        <div className="" key={it._id}>
          {it.content}
        </div>
      ))}
    </div>
  );
}
