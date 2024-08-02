import { timeFromToday, toLocalDateTime } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

export interface Chapter {
  name: string;
  link: string;
}

export interface ComicCardProps {
  title: string;
  image: string;
  date: string;
  view: number;
  href: string;
  chapters?: Chapter[];
}

export default function ComicCard({
  title,
  image,
  date,
  view,
  href,
  chapters,
}: Readonly<ComicCardProps>) {
  return (
    <div className="min-w-0 rounded-md overflow-hidden h-fit">
      <Link href={href} className="overflow-hidden">
        <Image
          alt={title}
          src={image}
          width={1000}
          height={1000}
          className="h-80 object-cover hover:scale-105 hover:brightness-110 transition-all duration-300"
        />
      </Link>
      <div className="flex flex-col p-2">
        <Link href={href} className="flex w-fit mb-2">
          <p className="text-lg w-fit">{title}</p>
        </Link>
        {chapters && (
          <div className="flex flex-col text-sm">
            {chapters.map((chap) => (
              <Link
                className="w-fit hover:underline italic"
                key={chap.name}
                href={chap.link}
              >
                chap {chap.name}
              </Link>
            ))}
          </div>
        )}
        <div className="flex flex-row text-xs text-slate-100">
          <span className="whitespace-nowrap">{timeFromToday(date)}</span>
          <span>&nbsp;{"·"}&nbsp;</span>
          <span>{view} views</span>
        </div>
      </div>
    </div>
  );
}
