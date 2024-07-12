"use client";

import CenteredElement from "@/components/common/CenteredElement";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const current = useAppSelector((state) => state.message.current);
  const router = useRouter();

  useEffect(() => {
    if (current) {
      router.replace("/message/" + current);
    }
  }, [current, router]);

  return <CenteredElement>Choose Inbox</CenteredElement>;
}
