"use client";

import CenteredElement from "@/components/common/CenteredElement";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const current = useAppSelector((state) => state.message.current);
  const router = useRouter();
  if (current) {
    router.replace("/message/" + current);
  }

  return <CenteredElement>Choose Inbox</CenteredElement>;
}
