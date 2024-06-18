export interface Post {
  _id: string;
  profile: Profile;
  content: string;
  media: Media[];
  auth: string;
  tags: any[];
  createdAt: string;
  updatedAt: string;
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
  dayOfBirth: string;
  link: string;
  firstName: string;
  lastName?: string;
  avatar: string;
  background: string;
  createdAt: string;
  updatedAt: string;
}
