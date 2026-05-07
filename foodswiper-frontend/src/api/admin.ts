import client from "./client";

export interface AdminItem {
  id: number;
  name: string;
  description: string;
  type: string;
  yelpId?: string;
  imageUrl?: string;
}

export interface AdminItemPayload {
  name: string;
  description: string;
  type: string;
  yelpId?: string;
  imageUrl?: string;
}

export const getAdminItems = () => client.get<AdminItem[]>("/admin/items");

export const createAdminItem = (data: AdminItemPayload) =>
  client.post<AdminItem>("/admin/items", data);

export const updateAdminItem = (id: number, data: AdminItemPayload) =>
  client.put<AdminItem>(`/admin/items/${id}`, data);

export const deleteAdminItem = (id: number) =>
  client.delete(`/admin/items/${id}`);