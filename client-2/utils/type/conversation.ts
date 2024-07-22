export interface Conversation {
  _id: string;
  participants: Participants;
  type: string;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

export interface Participants {
  profile: string;
  name: string;
}

export interface Message {
  _id: string;
  conversation: string;
  from: string;
  message?: string;
  sticker?: string;
  updatedAt: Date;
  createdAt: Date;
  show: boolean;
  __v: number;
}
