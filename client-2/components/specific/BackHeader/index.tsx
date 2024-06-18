"use client";

import ImageButton from "@/components/common/ImageButton";
import StickyArea from "@/components/common/StickyArea";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export interface BackHeaderProps {
  headTitle: string;
}

export default function BackHeader({ headTitle }: Readonly<BackHeaderProps>) {
  const router = useRouter();
  return (
    <StickyArea className="p-2 border-b  bg-white">
      <div className="flex flex-row justify-start items-center gap-4">
        <ImageButton
          onClick={() => {
            router.back();
          }}
          image={<ArrowLeftIcon width={20} height={20} />}
        />
        <h1 className="text-lg font-bold">{headTitle}</h1>
      </div>
    </StickyArea>
  );
}
