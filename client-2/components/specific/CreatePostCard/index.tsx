"use client";

import Avatar from "@/components/common/Avatar";
import ImageButton from "@/components/common/ImageButton";
import { DivProps } from "@/utils/type/html";
import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  ListBulletIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import "./style.css";
import Button from "@/components/common/Button";
import { createPost } from "@/services/postService";
import { useNotify } from "@/hooks/useNotify";

export interface CreatePostFormProps {
  avatar: string;
}

type PostCreateData = {
  files?: File[];
  content?: string;
  auth: string;
};

export default function CreatePostForm({
  avatar,
  ...res
}: Readonly<CreatePostFormProps & DivProps>) {
  const router = useRouter();
  const imageRef = useRef(null);

  const [showNotify] = useNotify();

  const [postData, setPostData] = useState<PostCreateData>({
    auth: "friend",
    content: "",
  });

  const [preview, setPreview] = useState<
    { url: string; type: "video" | "image" }[] | null
  >(null);
  // const [selectedFile, setSelectedFile] = useState<File[] | null>(null);

  useEffect(() => {
    if (!postData?.files) {
      setPreview(null);
      return;
    }
    // create the preview

    const list: { url: string; type: "video" | "image" }[] = [];
    if (postData.files) {
      for (const element of postData.files) {
        const objectUrl = URL.createObjectURL(element);
        list.push({
          url: objectUrl,
          type: element.type.split("/")[0] as "video" | "image",
        });
      }
      setPreview(list);
    }

    // free memory when ever this component is unmounted
    return () => {
      list.forEach((it) => {
        URL.revokeObjectURL(it.url);
      });
    };
  }, [postData?.files]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const list = [];
    if (postData?.files) {
      list.push(...postData.files);
    }
    for (const element of e.target.files) {
      list.push(element);
    }
    setPostData({ ...postData, files: list });
  };
  const onSelectAuthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostData({ ...postData, auth: e.target.value });
  };
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, content: e.target.value });
  };
  const onRemoveMedia = (index: number) => {
    if (postData?.files) {
      const listMedia = [
        ...postData.files.slice(0, index),
        ...postData.files.slice(index + 1),
      ];
      setPostData({ ...postData, files: listMedia });
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await createPost(postData);

    showNotify("uploaded");
    console.log(response);
    router.back();
  };
  return (
    <div {...res}>
      <div className="bg-white rounded-lg flex-col">
        <div className="flex-row flex-start items-center">
          <ImageButton
            image={<XMarkIcon width={20} height={20} />}
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div className="p-4 flex flex-col">
          <form onSubmit={onSubmit}>
            {inputPart()}
            <div className="flex flex-row justify-start items-center">
              <select
                className="outline-0 text-sm text-blue-600"
                onChange={onSelectAuthChange}
                defaultValue={"friend"}
              >
                <option value="friend">Friend</option>
                <option value="only">Only Me</option>
                <option value="public">Anyone</option>
                <option value="follower">Followers</option>
              </select>
            </div>
            {actionPart()}
          </form>
        </div>
      </div>
    </div>
  );

  function inputPart() {
    return (
      <div className="flex flex-row gap-2 w-full">
        <Avatar src={avatar} />
        <div className="flex flex-col w-full">
          <textarea
            value={postData.content}
            onChange={onContentChange}
            placeholder="What do you think?"
            className="outline-0 w-full"
          />
          <div className="flex flex-row overflow-y-hidden object-contain overflow-x-scroll max-h-80 hide-bar gap-1 items-center">
            {preview?.map((p, index) => (
              <div
                key={p.url}
                className="relative shrink-0 grow-0 basis-auto max-h-80 w-fit"
              >
                <div className="absolute z-40 h-full w-full top-0 left-0">
                  <ImageButton
                    image={<XMarkIcon width={20} height={20} />}
                    onClick={() => {
                      onRemoveMedia(index);
                    }}
                  />
                </div>
                {p.type === "image" ? (
                  <Image
                    key={p.url}
                    alt="preview"
                    width={100}
                    height={100}
                    className="rounded-lg bg-black max-h-80 w-fit"
                    src={p.url}
                  />
                ) : (
                  <video
                    className="rounded-lg bg-black max-h-80 w-fit"
                    key={p.url}
                    src={p.url}
                    controls
                  >
                    <track kind="captions"></track>
                  </video>
                )}
              </div>
            ))}
          </div>

          <input
            name="files"
            onChange={onSelectFile}
            type="file"
            maxLength={4}
            multiple
            accept="image/*,video/*"
            id="file"
            ref={imageRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
    );
  }

  function actionPart() {
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row text-blue-600">
          <ImageButton
            image={<PhotoIcon width={20} height={20} />}
            onClick={(e) => {
              if (imageRef.current) {
                const element = imageRef.current as HTMLInputElement;
                element.click();
              }
            }}
          />
          <ImageButton image={<GifIcon width={20} height={20} />} />
          <ImageButton image={<ListBulletIcon width={20} height={20} />} />
          <ImageButton image={<FaceSmileIcon width={20} height={20} />} />
          <ImageButton image={<CalendarIcon width={20} height={20} />} />
          <ImageButton image={<MapPinIcon width={20} height={20} />} />
        </div>
        <div>
          <Button className="bg-blue-400 text-white px-4" type="submit">
            Post
          </Button>
        </div>
      </div>
    );
  }
}
