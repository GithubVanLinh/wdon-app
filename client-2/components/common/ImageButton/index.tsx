import Link from "next/link";
import Avatar from "../Avatar";
import { ReactNode } from "react";

export interface ImageButtonProps {
  href?: string;
  onClick?: () => void;
  image: ReactNode;
  text?: string;
}

export default function ImageButton({
  image,
  href,
  onClick,
  text,
}: Readonly<ImageButtonProps>) {
  const className =
    "flex flex-row gap-4 p-2 items-center hover:bg-gray-300 rounded-full w-fit";
  if (href) {
    return (
      <Link href={href} className={className}>
        {image}
        {text && <b className="text-xl hidden xl:flex">{text}</b>}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {image}
      {text && <b className="text-xl hidden xl:flex">{text}</b>}
    </button>
  );
}
