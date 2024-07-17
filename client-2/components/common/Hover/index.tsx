import { ReactNode } from "react";

export interface HoverProps {
  children: ReactNode;
  hover: ReactNode;
}

export default function Hover({ children, hover }: Readonly<HoverProps>) {
  return (
    <div className="h-full w-full relative group">
      <div className="h-full w-full top-0 left-0 absolute justify-center items-center group-hover:flex hidden">
        {hover}
      </div>
      {children}
    </div>
  );
}
