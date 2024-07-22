export interface Sticker {
  _id: string;
  name: string;
  owner: string;
  num: number;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
  stickers: StickerElement[];
}

export interface StickerElement {
  key: string;
  path: string;
}
