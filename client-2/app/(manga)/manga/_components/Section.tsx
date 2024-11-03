import Image from "next/image";
import Link from "next/link";
import ComicCard from "./ComicCard";
import { Manga } from "@/utils/type/manga";
import useService from "@/hooks/useService";
import { getManga } from "@/services/mangaService";

export interface SectionProps {
  data: Manga[];
  title: string;
  link: string;
}

export default function Section({ data, title, link }: Readonly<SectionProps>) {
  return (
    <div className="max-w-6xl w-full mb-4 min-w-0">
      <div className="border-b border-white mb-4 flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href="#">See more</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-4">
        {data.map((comic) => (
          <ComicCard
            key={comic._id}
            date={new Date().toString()}
            href={`/manga/read/${comic._id}`}
            view={3000}
            image={comic.headImage}
            title={comic.name}
            chapters={[{ name: "1", link: "#" }]}
          />
        ))}
      </div>
    </div>
  );
}
