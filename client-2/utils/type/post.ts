export interface Post {
  _id: string;
  profile: Profile;
  content: string;
  media: Media[];
  auth: string;
  tags: any[];
  __v: number;
}

export interface Media {
  type: MediaType;
  url: string;
}

export enum MediaType {
  Image = "image",
  Video = "video",
}

export interface Profile {
  _id: string;
  dayOfBirth: Date;
  __v: number;
  link: string;
}
