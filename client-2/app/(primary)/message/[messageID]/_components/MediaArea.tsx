"use client";

import useService from "@/hooks/useService";
import StickerList from "./sticker";
import { getAllStickers } from "@/services/stickerService";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { Sticker } from "@/utils/type/sticker";
import Image from "next/image";
import ImageButton from "@/components/common/ImageButton";

export interface MediaAreaProps {
  onIconClicked: (src: string) => void;
}

export default function MediaArea({ onIconClicked }: Readonly<MediaAreaProps>) {
  const { data, loading, error } = useService(getAllStickers, null);

  const [selected, setSelected] = useState<Sticker | null>(null);

  useEffect(() => {
    if (data) {
      setSelected(data[0]);
    }
  }, [data]);

  if (loading || !selected) {
    return <Loading />;
  }
  if (data)
    return (
      <div className="flex flex-col h-40">
        <div>
          <StickerList
            selected={selected._id}
            data={data}
            onClick={(id) => {
              const obj = data.find((p) => p._id === id);
              if (obj) setSelected(obj);
            }}
          ></StickerList>
        </div>
        <div className="flex flex-col overflow-y-scroll p-2">
          <div className="flex flex-row flex-wrap gap-1">
            {selected.stickers.map((ele, index) => (
              <button
                key={ele.key}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onIconClicked(ele.path);
                }}
              >
                <Image
                  className="w-32 aspect-square"
                  src={ele.path}
                  alt={ele.key}
                  width={100}
                  height={100}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
}
