"use client";
import CreatePostForm from "@/components/specific/CreatePostCard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const createModel = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        router.back();
      }
    };

    let element: HTMLDivElement;
    if (createModel.current) {
      element = createModel.current as HTMLDivElement;
      element.addEventListener("click", handleClickOutside);
    }

    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";

      if (element) {
        element.removeEventListener("click", handleClickOutside);
      }
    };
  }, [router]);

  return (
    <div
      ref={createModel}
      className="fixed bg-black/70 z-20 w-full h-full flex flex-col justify-start pt-4 items-center overflow-auto"
    >
      <div className="w-1/2 h-1/2">
        <CreatePostForm />
      </div>
    </div>
  );
}
