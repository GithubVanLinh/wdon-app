import { Media } from "@/utils/type/post";
import { convertToValidURL } from "@/utils/url";
import Image from "next/image";
import Link from "next/link";

export interface MediaShowProps {
  media: (Media & { baseLink: string })[];
}

export default function MediaShow({ media }: Readonly<MediaShowProps>) {
  return (
    <div>
      <div
        className={
          "rounded-lg overflow-hidden max-h-96 grid grid-flow-col gap-px" +
          (media.length === 2 ? " grid-rows-1" : " grid-rows-2") +
          (media.length > 4 ? " [&>*:nth-child(4)]:brightness-50" : "")
        }
      >
        {media.slice(0, 4).map((m, i) => {
          return (
            <Link
              scroll={false}
              href={m.baseLink + "/" + (i + 1)}
              key={m.url}
              className={
                "flex bg-black justify-center items-center " +
                (media.length % 2 === 1 && i === 0 && "row-span-2")
              }
            >
              {m.type === "image" ? (
                <Image
                  alt="image"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  src={m.url}
                />
              ) : (
                <video
                  className="object-contain w-full h-full"
                  key={i}
                  autoPlay
                  controls
                >
                  <source
                    src={convertToValidURL(m.url)}
                    type="video/mp4"
                  ></source>
                  <track kind="captions"></track>
                </video>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
