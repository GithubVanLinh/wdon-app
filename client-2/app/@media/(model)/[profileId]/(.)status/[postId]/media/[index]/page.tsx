"use client";

import Loading from "@/components/common/Loading";
import LoadingAndError from "@/components/common/LoadingAndError";
import MediaOverlay from "@/components/specific/MediaOverlay";
import UserInfo from "@/components/specific/UserInfo";
import useService from "@/hooks/useService";
import { getPost } from "@/services/postService";
import { MediaType } from "@/utils/type/post";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export interface PageProps {
  params: {
    profileId: string;
    postId: string;
    index: string;
  };
}

export default function Page({
  params: { profileId, postId, index },
}: Readonly<PageProps>) {
  const { data, error, loading } = useService(getPost, postId);
  const pathname = usePathname();
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  });

  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    return <div className="text-red">{error.message}</div>;
  }

  if (data) {
    const length = data.media.length;
    const currentIndex = +index - 1;
    const getUrl = (index: number) =>
      [...pathname.split("/").slice(0, -1), String(index + 1)].join("/");
    const prev = currentIndex - 1 >= 0 ? getUrl(currentIndex - 1) : undefined;
    const next =
      currentIndex + 1 < length ? getUrl(currentIndex + 1) : undefined;
    console.log(prev, next);
    const media = data.media[currentIndex];
    if (media.type === MediaType.Image) {
      return (
        <MediaOverlay prev={prev} next={next}>
          <Image alt="image" src={media.url} fill className="object-contain" />
        </MediaOverlay>
      );
    } else {
      return (
        <MediaOverlay prev={prev} next={next}>
          <video className="object-contain" autoPlay controls>
            <source src={media.url} type="video/mp4"></source>
            <track kind="captions"></track>
          </video>
        </MediaOverlay>
      );
    }
  }

  return <div></div>;
}
