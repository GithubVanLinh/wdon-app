import React from "react";
import { CardContentHeaderOptions, ContentCardHeader } from "..";

export * from "./header";

export type CardContentOptions = {
  readonly children: React.ReactNode;
  readonly header?: CardContentHeaderOptions;
  readonly border?: boolean;
};

export function ContentCard({
  children,
  header,
  border = false,
}: CardContentOptions) {
  return (
    <div
      className={
        "bg-white p-4 rounded-xl shadow-md" + (border ? " border-2" : "")
      }
    >
      {header && <ContentCardHeader {...header} />}
      {children}
    </div>
  );
}
