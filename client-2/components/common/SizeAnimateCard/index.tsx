import { ReactNode } from "react";

export interface SizeAnimateProps {
  size: string | number;
  children: ReactNode;
}

export default function SizeAnimate({
  size,
  children,
}: Readonly<SizeAnimateProps>) {
  return (
    <div
      className="transition-all duration-500 overflow-hidden"
      style={{ width: size }}
    >
      {children}
    </div>
  );
}
