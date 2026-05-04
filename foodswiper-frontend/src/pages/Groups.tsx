import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useGroups } from "../hooks/useGroups";
import "./Groups.css";

export default function Groups() {
  const { user } = useAuth();
  const userId = Number(user?.sub ?? user?.id ?? 1);
  const { groups, loading, create } = useGroups(userId);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await create(newName.trim());
      setNewName("");
    } catch (e) {
      console.error("Create group failed", e);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="groups-page">
        <div className="groups-loading"><span>👥</span><p>Loading groups...</p></div>
      </div>
    );
  }

  return (
    <div className="groups-page">
      <div className="groups-header">
        <h2>Groups</h2>
        <span className="groups-badge">{groups.length} groups</span>
      </div>

      <div className="create-group">
        <input
          className="group-input"
          placeholder="New group name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button className="create-btn" onClick={handleCreate} disabled={creating || !newName.trim()}>
          {creating ? "..." : "+ Create"}
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="groups-empty">
          <span>🍽️</span>
          <h3>No groups yet</h3>
          <p>Create a group to decide on food together!</p>
        </div>
      ) : (
        <div className="groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-icon">👥</div>
              <h3 className="group-name">{group.name}</h3>
              <p className="group-members">
                {group.members?.length ?? 0} member{group.members?.length !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
