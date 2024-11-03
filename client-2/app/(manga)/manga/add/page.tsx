"use client";

import InputWithSpan from "@/components/common/Input";
import SpanUpInput from "@/components/common/Input/SpanUp";
import { uploadManga, UploadMangaDto } from "@/services/mangaService";
import { link } from "fs";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export interface AddMangaPageProps {}

const defaultValue: UploadMangaDto = {
  mangas: [],
  name: "",
  type: "one-shot",
  author: "",
  chapter: "",
  head: undefined,
};

export default function AddMangaPage({}: Readonly<AddMangaPageProps>) {
  const [links, setLinks] = useState<string[]>([]);
  const [headLink, setHeadLink] = useState<string>();
  const [mangaInfo, setMangaInfo] = useState<UploadMangaDto>(defaultValue);

  useEffect(() => {
    const listLink: string[] = [];
    mangaInfo.mangas.forEach((f) => {
      listLink.push(URL.createObjectURL(f));
    });
    setLinks(listLink);
    return () => {
      listLink.forEach((d) => {
        URL.revokeObjectURL(d);
      });
    };
  }, [mangaInfo.mangas]);

  useEffect(() => {
    let link: string;
    if (mangaInfo.head) {
      const link = URL.createObjectURL(mangaInfo.head);
      setHeadLink(link);
    }

    return () => {
      if (link) URL.revokeObjectURL(link);
    };
  }, [mangaInfo.head]);

  const handleUploadManga = async () => {
    const res = await uploadManga(mangaInfo);
    setMangaInfo(defaultValue);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.target.name;
    setMangaInfo({ ...mangaInfo, [key]: e.target.value });
  };

  return (
    <div className="text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadManga();
        }}
      >
        <div>
          <div className="flex flex-row flex-wrap">
            <InputWithSpan
              name="name"
              onChange={handleInputChange}
              required
              text="Name"
              className="bg-slate-800"
            ></InputWithSpan>
            <InputWithSpan
              name="author"
              onChange={handleInputChange}
              text="Author"
              className="bg-slate-800"
            ></InputWithSpan>
            <InputWithSpan
              name="chapter"
              onChange={handleInputChange}
              text="Chapter"
              className="bg-slate-800"
            ></InputWithSpan>
            <div className="flex justify-center items-center flex-row p-2">
              <span className="text-slate-400">Type: </span>
              <select
                className="bg-slate-800 text-white outline-none"
                value={mangaInfo.type}
                onChange={(e) => {
                  e.preventDefault();
                  setMangaInfo({ ...mangaInfo, type: e.target.value });
                }}
              >
                <option value="one-shot">One Shot</option>
                <option value="long">Long</option>
              </select>
            </div>
            <div>
              <h2>Head Image</h2>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setMangaInfo({
                      ...mangaInfo,
                      head: e.target.files[0],
                    });
                  }
                }}
              />
              {headLink && (
                <Image
                  alt="head image"
                  width={100}
                  height={100}
                  src={headLink}
                ></Image>
              )}
            </div>
          </div>

          <InputWithSpan
            text="Descriptions"
            className="bg-slate-800 w-screen"
          ></InputWithSpan>
        </div>
        <div className="border-t-orange-400 border-t mt-2 p-2">
          <input
            type="file"
            multiple
            onChange={(e) => {
              const listF = [];
              if (e.target.files) {
                for (let i = 0; i < e.target.files?.length; i++) {
                  listF.push(e.target.files[i]);
                }
              }
              setMangaInfo({ ...mangaInfo, mangas: listF });
            }}
          ></input>
          <div className="">
            {mangaInfo.mangas.length === 0 ? (
              "No file chosen"
            ) : (
              <div className="w-full flex flex-wrap gap-1">
                {links.map((src, i) => (
                  <div className="object-contain flex relative" key={i}>
                    <Image
                      alt={src}
                      width={200}
                      height={200}
                      className="object-contain h-48 w-auto"
                      src={src}
                    />
                    <span className="m-1 hover:bg-transparent absolute bg-slate-700 p-2 w-10 h-10 flex justify-center items-center font-bold rounded-full">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center p-2">
            <button
              type="submit"
              className="border border-orange-400 p-2 rounded hover:font-bold hover:bg-orange-400"
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
