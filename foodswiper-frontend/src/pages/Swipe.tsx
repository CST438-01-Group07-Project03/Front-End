import { useAuth } from "../providers/AuthProvider";
import { useFeed } from "../hooks/useFeed";
import SwipeCard from "../components/SwipeCard";
import './Swipe.css';

export default function Swipe() {
  const { user } = useAuth();
  const userId = user?.id ?? 0;
  const { feed, loading, empty, swipe } = useFeed(userId);

  const handleButton = (liked: boolean) => {
    if (feed.length === 0) return;
    swipe(feed[feed.length - 1], liked);
  };

  if (loading) {
    return (
      <div className="swipe-page">
        <div className="swipe-loading">
          <span>🍔</span>
          <p>Loading your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="swipe-page">
      <div className="swipe-header">
        <h2>Discover</h2>
        <span className="feed-badge">{feed.length} left</span>
      </div>

      <div className="card-stack-wrapper">
        {empty && feed.length === 0 ? (
          <div className="empty-state">
            <span>🎉</span>
            <h3>You've seen it all!</h3>
            <p>Come back later for more food to swipe on.</p>
          </div>
        ) : (
          <div className="card-stack">
            {feed.slice(-3).map((item, i) => (
              <SwipeCard
                key={item.id}
                item={item}
                index={feed.slice(-3).length - 1 - i}
                onSwipe={swipe}
              />
            ))}
          </div>
        )}
      </div>

      <div className="swipe-actions">
        <button className="action-btn pass" onClick={() => handleButton(false)} disabled={feed.length === 0} title="Pass">
          👎
        </button>
        <button className="action-btn like" onClick={() => handleButton(true)} disabled={feed.length === 0} title="Like">
          ❤️
        </button>
      </div>

      <p className="swipe-hint">drag the card or tap a button</p>
    </div>
  );
}
