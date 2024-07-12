import { DivProps } from "@/utils/type/html";
import { ReactNode } from "react";

export interface ListProps<T> {
  list: T[];
  item: (it: T, next?: T) => ReactNode;
}

export default function List<T>({
  list,
  item,
  ...res
}: Readonly<ListProps<T> & DivProps>) {
  return (
    <div {...res}>{list.map((it, index, arr) => item(it, arr[index + 1]))}</div>
  );
}
