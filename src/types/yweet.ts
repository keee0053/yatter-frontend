// src/types/yweet.ts

export type Yweet = {
  id: number;
  content: string;
  user: {
    username: string;
    avatar: string;
  };
};
