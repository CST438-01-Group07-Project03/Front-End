export interface User {
  id?: number;
  sub?: string;
  login?: string;
  name?: string;
  email?: string;
  picture?: string;
  avatar_url?: string;
  username?: string;
  favorites?: Item[];
  group_ids?: number[];
}

export interface Photo {
  id: number;
  url: string;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  type?: string;
  imageUrl?: string;
  photos?: Photo[];
}

export interface SwipeHistory {
  id: number;
  user?: User;
  item: Item;
  liked: boolean;
  swipedAt?: string;
}

export interface Group {
  id: number;
  name: string;
  members?: User[];
}
