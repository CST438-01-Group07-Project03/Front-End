import { useState, useEffect } from "react";
import { getLikes, unlike } from "../api/swipe";
import type { SwipeHistory } from "../types";

export function useFavorites(userId: number) {
  const [likes, setLikes] = useState<SwipeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getLikes(userId)
      .then((res) => setLikes(res.data))
      .catch(() => setLikes([]))
      .finally(() => setLoading(false));
  }, [userId]);

  const remove = async (swipeId: number) => {
    try {
      await unlike(userId, swipeId);
      setLikes((prev) => prev.filter((s) => s.id !== swipeId));
    } catch (e) {
      console.error("Unlike failed", e);
    }
  };

  return { likes, loading, remove };
}
