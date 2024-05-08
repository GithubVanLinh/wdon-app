import Image from "next/image";
import { ContentCard } from "..";

export function MediaAdd() {
  return (
    <ContentCard border>
      <div className="flex flex-row justify-between">
        <div className="flex-col">Add to your post</div>
        <div className="flex flex-row">
          <div className="flex justify-center items-center gap-2">
            <button onClick={() => window.alert("add image")}>
              <Image src="/image.svg" alt="image" width={30} height={30} />
            </button>
            <button onClick={() => window.alert("tag")}>
              <Image src="/tag.svg" alt="tag" width={30} height={30} />
            </button>
          </div>
        </div>
      </div>
    </ContentCard>
  );
}
