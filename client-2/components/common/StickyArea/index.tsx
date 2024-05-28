import { DivProps } from "@/utils/type/html";

export interface StickyAreaProps {}

export default function StickyArea({
  children,
  ...res
}: Readonly<StickyAreaProps & DivProps>) {
  const className = [res.className, "sticky top-0 h-fit z-10 bg-white"];
  return <div className={className.join(" ")}>{children}</div>;
}
