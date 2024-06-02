export interface Post {
  _id: string;
  profile: Profile;
  content: string;
  media: Media[];
  auth: string;
  tags: any[];
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
  link: string;
  firstName: string;
  lastName?: string;
}
