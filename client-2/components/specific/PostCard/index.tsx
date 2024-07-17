"use client";

import Avatar from "@/components/common/Avatar";
import IconAndText from "@/components/common/IconAndText";
import { Post } from "@/utils/type/post";
import {
  ArrowDownOnSquareIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  ChartBarIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useRef, useState } from "react";
import MediaShow from "../MediaShow";
import UserInfo from "../UserInfo";
import TextTransformer from "@/components/common/TextTransformer";
import { BASE_AVATAR_URL } from "@/utils/const";
import { toLocalDateTime } from "@/utils/date";
import Link from "next/link";

export interface PostCardProps {
  top?: ReactNode;
  post: Post;
  onClick?: () => void;
}

export default function PostCard({ post, onClick }: Readonly<PostCardProps>) {
  const profileLink = `/${post.profile._id}`;
  const ref = useRef(null);

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          if (
            e.target instanceof HTMLImageElement ||
            e.target instanceof HTMLVideoElement ||
            e.target instanceof HTMLAnchorElement
          ) {
          } else {
            if (
              e.target instanceof HTMLDivElement &&
              e.target.className.includes("profile-info")
            ) {
            } else if (onClick) {
              onClick();
            }
          }
        }}
        className="flex flex-col hover:bg-gray-200 p-2"
      >
        <div className="flex flex-row">
          <div className="flex justify-end items-start p-1 pl-3 relative h-fit group">
            <Link ref={ref} href={profileLink} className="h-fit w-fit">
              <Avatar src={post.profile.avatar || BASE_AVATAR_URL} />
            </Link>
            <div
              className="profile-info flex-col transition-all duration-500 
              absolute bottom-20 -left-4 bg-blue-50 border z-50 w-40 hover:visible opacity-0 hover:opacity-100 invisible 
              group-hover:visible group-hover:opacity-100 delay-300"
            >
              <div className="profile-info">Profile Info</div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {postInfo(
              post.profile.firstName,
              post.profile.link,
              toLocalDateTime(post.createdAt)
            )}
            {post.content && <TextTransformer text={post.content} />}
            {post.media && (
              <div>
                <MediaShow
                  media={post.media.map((m) => ({
                    ...m,
                    baseLink: `/${post.profile._id}/status/${post._id}/media`,
                  }))}
                />
              </div>
            )}
            {rateInfo()}
          </div>
        </div>
      </div>
    </div>
  );

  function postInfo(name: string, link: string, time: string) {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Link href={profileLink} className="font-bold">
            {name}
          </Link>
          <Link href={profileLink} className="text-gray-400">
            @{link}
          </Link>
          <div className="text-gray-400">{time}</div>
        </div>

        <div>
          <EllipsisHorizontalIcon width={20} height={20} />
        </div>
      </div>
    );
  }

  function rateInfo() {
    return (
      <div className="flex justify-between flex-row items-center">
        <IconAndText icon={<EnvelopeIcon width={20} height={20} />} text="3" />
        <IconAndText
          icon={<ArrowPathRoundedSquareIcon width={20} height={20} />}
          text="3"
        />
        <IconAndText icon={<HeartIcon width={20} height={20} />} text="3" />
        <IconAndText icon={<ChartBarIcon width={20} height={20} />} text="3" />
        <div className="flex flex-row gap-1 py-2">
          <BookmarkIcon width={20} height={20} />
          <ArrowUpOnSquareIcon width={20} height={20} />
          <ArrowDownOnSquareIcon width={20} height={20} />
        </div>
      </div>
    );
  }
}
