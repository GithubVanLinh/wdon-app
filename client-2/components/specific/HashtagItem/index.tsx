import ImageButton from "@/components/common/ImageButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export interface HashtagItemProps {
  category: string;
  name: string;
  num: string;
}

export default function HashtagItem({
  category,
  name,
  num,
}: Readonly<HashtagItemProps>) {
  return (
    <div className="flex flex-row justify-between p-2 hover:bg-gray-200">
      <div className="flex flex-col truncate">
        <div>{category}</div>
        <div className="font-bold">{name}</div>
        <div>{num}</div>
      </div>
      <div className="flex items-start justify-start">
        <ImageButton
          image={<EllipsisHorizontalIcon width={20} height={20} />}
        />
      </div>
    </div>
  );
}
