import client from "./client";
import type { Group } from "../types";

export const getGroups = () => client.get<Group[]>("/groups");

export const getGroup = (id: number) => client.get<Group>(`/groups/${id}`);

export const createGroup = (name: string) =>
  client.post<Group>("/groups", { name });

export const addMember = (groupId: number, userId: number) =>
  client.put<Group>(`/groups/${groupId}/addMember/${userId}`);

export const removeMember = (groupId: number, userId: number) =>
  client.put(`/groups/${groupId}/removeMember/${userId}`);

export const deleteGroup = (id: number) => client.delete(`/groups/${id}`);
