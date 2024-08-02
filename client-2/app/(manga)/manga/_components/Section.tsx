import Image from "next/image";
import Link from "next/link";
import ComicCard from "./ComicCard";

interface ComicData {
  id: string;
  name: string;
  url: string;
}

export interface SectionProps {
  data: ComicData[];
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
            key={comic.id}
            date={new Date().toString()}
            href="#"
            view={3000}
            image={comic.url}
            title={comic.name}
            chapters={[{ name: "1", link: "#" }]}
          />
        ))}
      </div>
    </div>
  );
}
