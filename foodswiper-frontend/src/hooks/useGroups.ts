import { useState, useEffect } from "react";
import { getGroups, createGroup, addMember } from "../api/groups";
import type { Group } from "../types";

export function useGroups(userId: number) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGroups()
      .then((res) => setGroups(res.data))
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  const create = async (name: string) => {
    const res = await createGroup(name);
    const group = res.data;
    if (userId) await addMember(group.id, userId);
    setGroups((prev) => [...prev, group]);
    return group;
  };

  const join = async (groupId: number) => {
    if (!userId) return;
    const res = await addMember(groupId, userId);
    setGroups((prev) => prev.map((g) => (g.id === groupId ? res.data : g)));
    return res.data;
  };

  return { groups, loading, create, join };
}
