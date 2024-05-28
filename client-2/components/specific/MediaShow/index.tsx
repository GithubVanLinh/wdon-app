import { Media } from "@/utils/type/post";
import Image from "next/image";

export interface MediaShowProps {
  media: Media[];
}

export default function MediaShow({ media }: Readonly<MediaShowProps>) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden max-h-96 grid grid-rows-2 grid-flow-col gap-px">
        {media.map((m, i) => {
          return (
            <div
              key={m.url}
              className={
                "flex bg-black " +
                (media.length % 2 === 1 && i === 0 && "row-span-2")
              }
            >
              {m.type === "image" ? (
                <Image
                  alt="image"
                  width={400}
                  height={400}
                  className="object-cover grow flex shrink basis-0"
                  src={m.url}
                />
              ) : (
                <video className="object-contain" key={i} autoPlay controls>
                  <source src={m.url} type="video/mp4"></source>
                  <track kind="captions"></track>
                </video>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
