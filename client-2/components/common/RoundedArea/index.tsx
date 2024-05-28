import { DivProps } from "@/utils/type/html";
import { ReactNode } from "react";

export interface RounedAreaProps {
  children: ReactNode;
}

export default function RounedArea({
  children,
  ...res
}: Readonly<RounedAreaProps & DivProps>) {
  const className = [res.className, "rounded-lg border border-gray-100"];
  return <div className={className.join(" ")}>{children}</div>;
}
