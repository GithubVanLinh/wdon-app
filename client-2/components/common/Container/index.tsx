import { DivProps } from "@/utils/type/html";
import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  rounded?: boolean;
  col?: boolean;
  justifyContent?: "between" | "start" | "end" | "center";
  alignItems?: "between" | "start" | "end" | "center";
}

export default function Container({
  children,
  rounded = false,
  col = false,
  justifyContent = "start",
  alignItems = "start",
  className,
  ...res
}: Readonly<ContainerProps & DivProps>) {
  const classNameList = [className, "flex"];
  col ? classNameList.push("flex-col") : classNameList.push("flex-row");
  rounded && classNameList.push("rounded-lg");
  switch (justifyContent) {
    case "between":
      classNameList.push("justify-between");
      break;
    case "center":
      classNameList.push("justify-center");
      break;
    case "end":
      classNameList.push("justify-end");
      break;
    case "start":
      classNameList.push("justify-start");
      break;
    default:
      break;
  }
  switch (alignItems) {
    case "between":
      classNameList.push("items-between");
      break;
    case "center":
      classNameList.push("items-center");
      break;
    case "end":
      classNameList.push("items-end");
      break;
    case "start":
      classNameList.push("items-start");
      break;
    default:
      break;
  }

  return (
    <div {...res} className={classNameList.join(" ")}>
      {children}
    </div>
  );
}
