export type GetWithProfile<T> = T & {
  profileId: string;
};

export type GetById<T> = T & {
  id: string;
};
