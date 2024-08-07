import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import { useNotify } from "@/hooks/useNotify";
import { BASE_AVATAR_URL } from "@/utils/const";
import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  ListBulletIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export interface CreatePostFormProps {
  avatar?: string;
}

export default function CreatePostForm({
  avatar,
}: Readonly<CreatePostFormProps>) {
  const [showNotify] = useNotify();

  return (
    <div className="">
      <div className="flex flex-row gap-2 pt-4 pl-4">
        <div className="flex grow-0 shrink-0 basis-auto">
          <Avatar src={avatar || BASE_AVATAR_URL} />
        </div>
        <div className="flex flex-col grow shrink basis-0 min-w-0 divide-y divide-gray-100">
          {mainInput()}
          {imageAndPost()}
        </div>
      </div>
    </div>
  );

  function mainInput() {
    return (
      <div className="w-full flex flex-col p-2">
        <textarea className="outline-0 peer" placeholder="What happen" />
      </div>
    );
  }

  function imageAndPost(): ReactNode {
    return (
      <div className="flex flex-row justify-between p-3">
        <div className="flex flex-row items-center gap-2 text-blue-600">
          <PhotoIcon width={20} height={20} />
          <GifIcon width={20} height={20} />
          <ListBulletIcon width={20} height={20} />
          <FaceSmileIcon width={20} height={20} />
          <CalendarIcon width={20} height={20} />
          <MapPinIcon width={20} height={20} />
        </div>
        <div>
          <Button
            className="bg-blue-400 text-white px-4 py-2"
            onClick={() => {
              showNotify("Test");
            }}
          >
            Post
          </Button>
        </div>
      </div>
    );
  }
}
