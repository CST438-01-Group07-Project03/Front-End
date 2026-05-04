import { useAuth } from "../providers/AuthProvider";
import { useFavorites } from "../hooks/useFavorites";
import "./Favorites.css";

const FOOD_EMOJIS: Record<string, string> = {
  pizza: "🍕", burger: "🍔", sushi: "🍣", taco: "🌮", ramen: "🍜", salad: "🥗",
};

const BG_COLORS = ["#F6E7E2","#E8F0F6","#F0EAF6","#E8F6EC","#F6F0E8","#F6E8F0"];

function getEmoji(name: string = ""): string {
  const lower = name.toLowerCase();
  for (const key of Object.keys(FOOD_EMOJIS)) {
    if (lower.includes(key)) return FOOD_EMOJIS[key];
  }
  return "🍽️";
}

export default function Favorites() {
  const { user } = useAuth();
  const userId = Number(user?.sub ?? user?.id ?? 1);
  const { likes, loading, remove } = useFavorites(userId);

  if (loading) {
    return (
      <div className="fav-page">
        <div className="fav-loading"><span>❤️</span><p>Loading favorites...</p></div>
      </div>
    );
  }

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h2>Favorites</h2>
        <span className="fav-badge">{likes.length} liked</span>
      </div>

      {likes.length === 0 ? (
        <div className="fav-empty">
          <span>💔</span>
          <h3>No favorites yet</h3>
          <p>Start swiping to build your list!</p>
        </div>
      ) : (
        <div className="fav-grid">
          {likes.map((swipe) => {
            const item = swipe.item;
            if (!item) return null;
            return (
              <div key={swipe.id} className="fav-card" style={{ background: BG_COLORS[item.id % BG_COLORS.length] }}>
                <button className="fav-remove" onClick={() => remove(swipe.id)} title="Remove">✕</button>
                <div className="fav-emoji">{getEmoji(item.name)}</div>
                <span className="fav-type">{item.type || "Food"}</span>
                <h3 className="fav-name">{item.name}</h3>
                <p className="fav-desc">{item.description || "No description."}</p>
                <p className="fav-date">
                  {swipe.swipedAt ? new Date(swipe.swipedAt).toLocaleDateString() : "Recently liked"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
