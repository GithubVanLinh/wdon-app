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
  console.log("image data", data);
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
      const urlL = media.url.split("\\");
      const url = [urlL[0], "\\", ...urlL.slice(1)].join("\\");
      console.log("media", url);
      return (
        <MediaOverlay prev={prev} next={next}>
          <video className="object-contain" autoPlay controls>
            <source src={url} type="video/mp4"></source>
            <track kind="captions"></track>
          </video>
        </MediaOverlay>
      );
    }
  }

  return <div></div>;
}
