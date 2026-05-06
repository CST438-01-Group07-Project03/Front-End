import { useState, useEffect } from "react";
import { getFeed, recordSwipe } from "../api/swipe";
import type { Item } from "../types";

export function useFeed(userId: number) {
  const [feed, setFeed] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!userId) return;
    getFeed(userId)
      .then((res) => {
        setFeed(res.data);
        if (res.data.length === 0) setEmpty(true);
      })
      .catch(() => setEmpty(true))
      .finally(() => setLoading(false));
  }, [userId]);

  const swipe = async (item: Item, liked: boolean) => {
    setFeed((prev) => prev.filter((i) => i.id !== item.id));
    if (feed.length <= 1) setEmpty(true);
    try {
      await recordSwipe(userId, item.id, liked);
    } catch (e) {
      console.error("Swipe failed", e);
    }
  };

  return { feed, loading, empty, swipe };
}
