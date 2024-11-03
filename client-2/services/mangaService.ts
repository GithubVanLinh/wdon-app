import apiConfig from "@/config/apiConfig";
import { get, post } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Manga, MangaDetail } from "@/utils/type/manga";

const getListManga = async (page: number) => {
  const mangas: ApiResponse<Array<Manga>> = await get(
    apiConfig.endpoints.listManga,
    {
      params: {
        page: page,
      },
    }
  );
  return mangas;
};

const getManga = async (id: string) => {
  const manga: ApiResponse<MangaDetail> = await get(
    apiConfig.endpoints.getManga(id)
  );

  return manga;
};

export interface UploadMangaDto {
  mangas: File[];
  name: string;
  author?: string;
  chapter?: string;
  type: string;
  head?: File;
}

const uploadManga = async (data: UploadMangaDto) => {
  const formData = new FormData();
  formData.append("name", data.name);
  data.mangas.forEach((img) => {
    formData.append("mangas", img);
  });
  const keys = ["author", "chapter", "type", "headImage"];
  for (let k of keys) {
    const key = k as keyof Omit<UploadMangaDto, "mangas">;
    if (data[key]) formData.append(key, data[key]);
  }
  const res: ApiResponse<string> = await post(
    apiConfig.endpoints.uploadManga,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
};

export { getListManga, getManga, uploadManga };
