"use client";

import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import useService from "@/hooks/useService";
import { getManga } from "@/services/mangaService";
import { toLocalDateTime } from "@/utils/date";
import Image from "next/image";
import { useState } from "react";

export interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Readonly<PageProps>) {
  const { data, error, loading } = useService(getManga, id);
  const [size, setSize] = useState(1000);

  if (loading) return <Loading></Loading>;

  if (data)
    return (
      <div className="justify-center items-center">
        <div className="p-2">
          <div>
            <h1 className="text-white font-bold text-3xl">{data.data.name}</h1>
          </div>
          <div className="text-orange-400 font-bold flex flex-col text-sm">
            <span>
              Author: <a>{data.data.author}</a>
            </span>
            <span>
              Upload:{" "}
              {toLocalDateTime(data.data.createdAt, {
                noSecond: false,
              })}
            </span>
            <span>Type: {data.data.type}</span>
            <span>Chapter: {data.data.chapter}</span>
          </div>
        </div>

        <div className="text-white items-center justify-center relative">
          <div className="flex flex-col items-end p-2 sticky top-20 z-10">
            <button
              className=" bg-blue-800 text-white w-fit p-2"
              onClick={() => {
                size === 500 ? setSize(1000) : setSize(500);
              }}
            >
              {size}
            </button>
          </div>
          <div className="flex items-center justify-center relative">
            <Image
              src={data.data.headImage}
              alt="manga"
              sizes="100vh"
              width={size}
              height={size}
            />
          </div>
          {data.data.mangas.map((image, i) => (
            <div className="flex items-center justify-center relative" key={i}>
              <Image
                src={image}
                alt="manga"
                sizes="100vh"
                width={size}
                height={size}
              />
            </div>
          ))}
        </div>
      </div>
    );
}
