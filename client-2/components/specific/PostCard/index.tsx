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
import { ReactNode } from "react";
import MediaShow from "../MediaShow";

export interface PostCardProps {
  top?: ReactNode;
  post: Post;
}

export default function PostCard({ post }: Readonly<PostCardProps>) {
  return (
    <div>
      <div className="flex flex-col hover:bg-gray-200 p-2">
        <div></div>
        <div className="flex flex-row">
          <div className="flex justify-end items-start p-1 pl-3">
            <Avatar src="https://pbs.twimg.com/media/GOg9e2taMAAgya-?format=jpg&name=medium" />
          </div>
          <div className="flex flex-col w-full">
            {postInfo("Vu", "link", "8h")}
            <div>{post.content}</div>
            <div>
              <MediaShow media={post.media} />
            </div>
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
          <div className="font-bold">{name}</div>
          <div className="text-gray-400">@{link}</div>
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
