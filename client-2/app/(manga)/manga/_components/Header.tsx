import ImageButton from "@/components/common/ImageButton";
import {
  ArrowUpTrayIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export interface MangaHeadProps {
  onMenuClicked: () => void;
}

export default function MangaHead({ onMenuClicked }: Readonly<MangaHeadProps>) {
  return (
    <div className="w-full h-14 bg-blue-900 text-white justify-center items-center flex flex-row p-2 shadow-gray-900 shadow-md mb-2">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row items-center justify-start">
          <ImageButton
            onClick={(e) => {
              e.preventDefault();
              onMenuClicked();
            }}
            image={<Bars3Icon width={30} height={30} />}
            hover={{ bg: "hover:bg-blue-700" }}
          />
          <Link href="/manga">
            <h1 className="font-bold text-2xl">WDon Manga</h1>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end">
          <ImageButton
            image={<MagnifyingGlassIcon width={24} height={24} />}
            hover={{
              tooltip: { text: "Search", position: "bottom" },
              bg: "hover:bg-blue-700",
            }}
          />
          <ImageButton
            image={<ArrowUpTrayIcon width={24} height={24} />}
            href="/manga/add"
            hover={{
              tooltip: { text: "Upload Commic", position: "bottom" },
              bg: "hover:bg-blue-700",
            }}
          />
          <ImageButton
            image={<UserIcon width={24} height={24} />}
            hover={{
              tooltip: { text: "Account", position: "bottom" },
              bg: "hover:bg-blue-700",
            }}
          />
          <ImageButton
            image={<QuestionMarkCircleIcon width={24} height={24} />}
            hover={{
              tooltip: { text: "Help", position: "bottomleft" },
              bg: "hover:bg-blue-700",
            }}
          />
        </div>
      </div>
    </div>
  );
}
