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
    await addMember(res.data.id, userId);
    setGroups((prev) => [...prev, res.data]);
    return res.data;
  };

  return { groups, loading, create };
}
