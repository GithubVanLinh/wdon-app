export interface Manga {
  _id: string;
  name: string;
  createdAt: Date;
  headImage: string;
}

export interface MangaDetail {
  _id: string;
  name: string;
  author: string;
  chapter: string;
  type: string;
  mangas: any[];
  uploader: string;
  updatedAt: string;
  createdAt: string;
  headImage: string;
  __v: number;
}
