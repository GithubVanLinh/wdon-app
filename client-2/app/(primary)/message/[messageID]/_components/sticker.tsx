import Button from "@/components/common/Button";
import { Sticker } from "@/utils/type/sticker";

export interface StickerListProps {
  data: Sticker[];
  selected: string;
  onClick: (id: string) => void;
}

export default function StickerList({
  data,
  selected,
  onClick,
}: Readonly<StickerListProps>) {
  return (
    <div className="flex flex-row overflow-x-scroll scroll-none gap-2">
      {data.map((sticker) => (
        <Button
          circular={false}
          onClick={(e) => {
            e.preventDefault();
            onClick(sticker._id);
          }}
          key={sticker._id}
          disabled={selected === sticker._id}
          className={selected === sticker._id ? "bg-blue-600" : ""}
        >
          {sticker.name}
        </Button>
      ))}
    </div>
  );
}
