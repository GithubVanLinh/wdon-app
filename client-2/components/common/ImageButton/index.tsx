import Link from "next/link";
import Avatar from "../Avatar";
import { MouseEventHandler, ReactNode } from "react";
import { DivProps } from "@/utils/type/html";

export interface ImageButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  image: ReactNode;
  text?: string;
}

export default function ImageButton({
  image,
  href,
  onClick,
  text,
  ...res
}: Readonly<ImageButtonProps & DivProps>) {
  const className = [
    "flex flex-row gap-4 p-2 items-center hover:bg-gray-300 rounded-full w-fit",
    res.className,
  ];
  if (href) {
    return (
      <Link href={href} className={className.join(" ")}>
        {image}
        {text && <span className="text-xl hidden xl:flex">{text}</span>}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className.join(" ")} type="button">
      {image}
      {text && <span className="text-xl hidden xl:flex">{text}</span>}
    </button>
  );
}
