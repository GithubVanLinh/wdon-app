import Link from "next/link";
import Avatar from "../Avatar";
import { MouseEventHandler, ReactNode } from "react";
import { DivProps } from "@/utils/type/html";

export interface ImageButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  image: ReactNode;
  hover?: {
    bg?: string;
    tooltip?: {
      text: string;
      position: "bottom" | "bottomleft";
    };
  };
  text?: string;
}

export default function ImageButton({
  image,
  href,
  onClick,
  hover = { bg: "hover:bg-gray-300" },
  text,
  ...res
}: Readonly<ImageButtonProps & DivProps>) {
  const className = [
    "flex flex-row gap-4 p-2 items-center  rounded-full w-fit",
    hover.bg,
    res.className,
  ];
  if (hover.tooltip) {
    className.push("tooltip");
  }
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
      {hover.tooltip && (
        <span
          className={
            "transition-all duration-500 " +
            (hover.tooltip.position === "bottomleft"
              ? "tooltiptext-bl"
              : "tooltiptext")
          }
        >
          {hover.tooltip.text}
        </span>
      )}
    </button>
  );
}
