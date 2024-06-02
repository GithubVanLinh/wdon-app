"use client";
import ImageButton from "@/components/common/ImageButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export interface MediaOverlayProps {
  prev?: string;
  next?: string;
  children: ReactNode;
}

export default function MediaOverlay({
  children,
  prev,
  next,
}: Readonly<MediaOverlayProps>) {
  const router = useRouter();

  return (
    <div className="absolute flex text-white w-full h-full justify-center items-center">
      {prev && (
        <ImageButton
          onClick={() => {
            router.replace(prev);
          }}
          className="absolute bottom-1/2 left-2 z-30 bg-black/90"
          image={<ArrowLeftIcon width={20} height={20} />}
        />
      )}
      {next && (
        <ImageButton
          onClick={() => {
            router.replace(next);
          }}
          className="absolute bottom-1/2 right-2 z-30 bg-black/90"
          image={<ArrowRightIcon width={20} height={20} />}
        />
      )}
      <ImageButton
        className="absolute top-2 left-2 z-30"
        onClick={() => {
          router.back();
        }}
        image={<XMarkIcon width={20} height={20} />}
      />
      {children}
    </div>
  );
}
