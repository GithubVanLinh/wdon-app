"use client";

import { ReactNode, useEffect, useRef } from "react";

export interface EndlessListProps<T> {
  data: T[];
  item: (item: T) => ReactNode;
}

export default function EndlessList<T>({
  data,
  item,
}: Readonly<EndlessListProps<T>>) {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const invoke =
        window.document.body.clientHeight -
          (window.document.scrollingElement?.scrollTop || 0) <=
        window.innerHeight + 500;
      if (invoke) {
        console.log("loadmore");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return <div>{data.map((each) => item(each))}</div>;
}
