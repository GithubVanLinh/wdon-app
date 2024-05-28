import { DivProps } from "@/utils/type/html";
import { ReactNode } from "react";

export interface ListProps<T> {
  list: T[];
  item: (it: T) => ReactNode;
}

export default function List<T>({
  list,
  item,
  ...res
}: Readonly<ListProps<T> & DivProps>) {
  return <div {...res}>{list.map((it) => item(it))}</div>;
}
