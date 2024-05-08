import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export type CardContentHeaderOptions = {
  readonly title: string;
  readonly avatar: string;
  readonly actionStatus?: boolean;
  readonly subTitle: React.ReactNode;
  readonly ring?: boolean;
  readonly closeButton?: boolean;
};
export function ContentCardHeader({
  title,
  avatar,
  subTitle,
  actionStatus = false,
  ring = false,
  closeButton = true,
}: CardContentHeaderOptions) {
  return (
    <div className="flex flex-row mb-2">
      <div className="relative w-12 h-12 grid">
        <Avatar
          src={avatar || "/person.svg"}
          className={
            "rounded-full border border-gray-100 shadow-sm self-center flex" +
            (ring && " ring-2")
          }
        />
        {actionStatus && (
          <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-between">
          <div className="items-center justify-start flex ml-4 font-bold">
            {title}
          </div>
          <div className="items-center justify-start flex ml-4 text-xs">
            {subTitle}
          </div>
        </div>
        <div className="flex justify-end items-start">
          {closeButton && (
            <button
              onClick={() => {
                window.alert("ehehe");
              }}
            >
              <Image src="/close.svg" alt="close" width={20} height={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
