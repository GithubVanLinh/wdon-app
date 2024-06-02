"use client";

import Button from "@/components/common/Button";
import CenteredElement from "@/components/common/CenteredElement";
import { useEffect, useRef } from "react";

export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    const element = window.document.body.querySelector(
      "#btn"
    ) as HTMLButtonElement;
    if (element) {
      element.onmouseover = (e: MouseEvent) => {
        element.style.position = "absolute";
        element.style.top =
          Math.random() * (window.innerHeight - 40) + 20 + "px";
        element.style.left =
          Math.random() * (window.innerWidth - 40) + 20 + "px";
      };
    }
  }, [ref.current]);
  return (
    <main className="h-screen relative">
      <CenteredElement>
        <div className="flex flex-col items-center">
          <h1 id="text">Chào em, Em có bị điên hông?</h1>
          <div className="flex flex-row justify-between w-full">
            <Button
              id="btn"
              onClick={() => alert("nothing change :))")}
              ref={ref}
              className="flex bg-red-400 font-bold"
            >
              Khum
            </Button>
            <Button
              onClick={(e) => {
                const container = window.document.body.querySelector(
                  "#container"
                ) as HTMLDivElement;
                container.style.display = "flex";
                container.style.opacity = "1";
              }}
              className="bg-green-400"
            >
              Yes yes yes
            </Button>
          </div>
        </div>
      </CenteredElement>
      <div
        id="container"
        className="fixed bg-red-800 z-10 w-screen h-screen hidden opacity-0 transition-opacity duration-1000 top-0 left-0"
      >
        <iframe
          loading="lazy"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/AYQCmVSVVDg?rel=0&autoplay=1"
          title="NHỮNG CÁI CH.ẾT BI THẢM TRONG CARTOON"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
}
