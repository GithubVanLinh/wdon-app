"use client";

import { NextUIProvider as SNextUIProvider } from "@nextui-org/react";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <SNextUIProvider>{children}</SNextUIProvider>;
}
