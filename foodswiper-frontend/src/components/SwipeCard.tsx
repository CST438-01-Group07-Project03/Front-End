import { useState, useRef } from "react";
import type { Item } from "../types";
import "./SwipeCard.css";

const FOOD_EMOJIS: Record<string, string> = {
  pizza: "🍕", burger: "🍔", sushi: "🍣", taco: "🌮",
  ramen: "🍜", salad: "🥗", chicken: "🍗", pasta: "🍝",
};

const BG_COLORS = [
  "#F6E7E2", "#E8F0F6", "#F0EAF6", "#E8F6EC", "#F6F0E8", "#F6E8F0",
];

function getEmoji(name: string = ""): string {
  const lower = name.toLowerCase();
  for (const key of Object.keys(FOOD_EMOJIS)) {
    if (lower.includes(key)) return FOOD_EMOJIS[key];
  }
  return "🍽️";
}

interface Props {
  item: Item;
  index?: number;
  onSwipe: (item: Item, liked: boolean) => void;
}

export default function SwipeCard({ item, index = 0, onSwipe }: Props) {
  const [drag, setDrag] = useState({ x: 0, y: 0, dragging: false });
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgColor = BG_COLORS[item.id % BG_COLORS.length];
  const emoji = getEmoji(item.name);
  const direction = drag.x > 80 ? "right" : drag.x < -80 ? "left" : null;
  const rotation = drag.x * 0.08;

  const handlePointerDown = (e: React.PointerEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, dragging: true });
    cardRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.dragging || !startPos.current) return;
    setDrag({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
      dragging: true,
    });
  };

  const handlePointerUp = () => {
    if (direction) onSwipe(item, direction === "right");
    setDrag({ x: 0, y: 0, dragging: false });
    startPos.current = null;
  };

  return (
    <div
      ref={cardRef}
      className={`swipe-card${drag.dragging ? " dragging" : ""}`}
      style={{
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`,
        zIndex: 10 - index,
        background: bgColor,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {direction === "right" && <div className="swipe-label like">LIKE ✓</div>}
      {direction === "left" && <div className="swipe-label nope">NOPE ✕</div>}

      <div className="card-emoji">{emoji}</div>
      <div className="card-info">
        <span className="card-type-badge">{item.type || "Food"}</span>
        <h2 className="card-name">{item.name}</h2>
        <p className="card-desc">{item.description || "No description yet."}</p>
      </div>
    </div>
  );
}
