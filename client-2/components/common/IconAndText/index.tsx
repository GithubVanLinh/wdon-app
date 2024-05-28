import { ReactNode } from "react";

export interface IconAndTextProps {
  icon: ReactNode;
  text: string;
}

export default function IconAndText({
  icon,
  text,
}: Readonly<IconAndTextProps>) {
  return (
    <div className="flex flex-row items-center gap-1">
      {icon}
      <span>{text}</span>
    </div>
  );
}
