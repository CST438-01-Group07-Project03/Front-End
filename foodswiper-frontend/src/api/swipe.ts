import client from "./client";
import type { SwipeHistory, Item } from "../types";

export const getFeed = (userId: number) =>
  client.get<Item[]>(`/users/${userId}/feed`);

export const getLikes = (userId: number) =>
  client.get<SwipeHistory[]>(`/users/${userId}/likes`);

export const recordSwipe = (userId: number, itemId: number, liked: boolean) =>
  client.post<SwipeHistory>(`/users/${userId}/likes`, { itemId, liked });

export const unlike = (userId: number, likeId: number) =>
  client.delete(`/users/${userId}/likes/${likeId}`);
