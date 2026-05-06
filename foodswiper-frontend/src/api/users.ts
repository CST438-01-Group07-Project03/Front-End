import client from "./client";
import type { User, Item } from "../types";

export const getMe = () => client.get<User>("/me");

export const getUser = (id: number) => client.get<User>(`/users/${id}`);

export const updateUser = (id: number, data: Partial<User>) =>
  client.put<User>(`/users/${id}`, data);

export const addFavorite = (userId: number, itemId: number) =>
  client.put<Item>(`/users/${userId}/addFavorite/${itemId}`);

export const removeFavorite = (userId: number, itemId: number) =>
  client.put(`/users/${userId}/removeFavorite/${itemId}`);

export const deleteUser = (id: number) => client.delete(`/users/${id}`);
