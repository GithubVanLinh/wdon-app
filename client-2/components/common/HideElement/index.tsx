import { HTMLAttributes } from "react";

export interface HideElementProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
}

export default function HideElement({
  children,
  className = "",
  open = false,
}: Readonly<HideElementProps>) {
  const _className = [className, "transition-all duration-300 overflow-hidden"];

  if (open) {
    _className.push("h-40");
  } else {
    _className.push("h-0");
  }
  return <div className={_className.join(" ")}>{children}</div>;
}
