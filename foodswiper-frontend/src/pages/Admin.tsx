import { useEffect, useState } from "react";
import {
  createAdminItem,
  deleteAdminItem,
  getAdminItems,
  type AdminItem,
  type AdminItemPayload,
} from "../api/admin";
import "./Admin.css";

const emptyForm: AdminItemPayload = {
  name: "",
  description: "",
  type: "Restaurant",
  yelpId: "",
  imageUrl: "",
};

export default function Admin() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [form, setForm] = useState<AdminItemPayload>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadItems = async () => {
    const res = await getAdminItems();
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange =
    (field: keyof AdminItemPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAdminItem(form);
      setForm(emptyForm);
      await loadItems();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteAdminItem(id);
    await loadItems();
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Settings</h1>
          <p>Add items that will appear in the Discover feed.</p>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <label>
              <span>Name</span>
              <input value={form.name} onChange={handleChange("name")} required />
            </label>

            <label>
              <span>Type</span>
              <input value={form.type} onChange={handleChange("type")} required />
            </label>

            <label>
              <span>Image URL</span>
              <input value={form.imageUrl} onChange={handleChange("imageUrl")} />
            </label>

            <label>
              <span>Yelp ID</span>
              <input value={form.yelpId} onChange={handleChange("yelpId")} />
            </label>
          </div>

          <label className="admin-description">
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              required
            />
          </label>

          <button className="admin-submit" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Add Item"}
          </button>
        </form>

        <div className="admin-list">
          <h2>Current Discover Items</h2>

          {items.length === 0 ? (
            <p className="admin-empty">No items yet.</p>
          ) : (
            <div className="admin-cards">
              {items.map((item) => (
                <div key={item.id} className="admin-card">
                  <div className="admin-card-body">
                    <div className="admin-card-top">
                      <h3>{item.name}</h3>
                      <span>{item.type}</span>
                    </div>
                    <p>{item.description}</p>
                    {item.imageUrl && <small>{item.imageUrl}</small>}
                  </div>

                  <button
                    className="admin-delete"
                    onClick={() => handleDelete(item.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}