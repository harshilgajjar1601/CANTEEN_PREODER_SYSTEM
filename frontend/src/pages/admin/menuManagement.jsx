import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/menuManagement.css";
import "../../styles/admin/adminSidebar.css";

const CATEGORIES = [
  "Fast Food",
  "Beverages",
  "Breakfast",
  "Snacks",
  "Chinese",
  "Street Food",
  "Desserts"
];

export default function MenuManagement() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    category: "Fast Food",
    price: "",
    tag: "",
    image_url: ""
  });

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/menu");
      const data = await res.json();
      if (data.success) {
        setMenuItems(data.items);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingItem) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert("Item added successfully!");
        resetForm();
        fetchMenuItems();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Add error:", error);
      alert("Failed to add item");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/menu/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert("Item updated successfully!");
        resetForm();
        fetchMenuItems();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update item");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/menu/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        alert("Item deleted successfully!");
        setDeleteConfirm(null);
        fetchMenuItems();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete item");
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      tag: item.tag || "",
      image_url: item.image_url || ""
    });
    setShowForm(true);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      name: "",
      category: "Fast Food",
      price: "",
      tag: "",
      image_url: ""
    });
  };

  const filteredItems = categoryFilter === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === categoryFilter);

  return (
    <div className="menu-management-container">
      <div className={`Sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-block">
          <span className="logo-mark">CP</span>
          <div>
            <h2 className="logo">Admin</h2>
            <p className="logo-subtitle">Canteen control room</p>
          </div>
        </div>

        <ul>
          <li onClick={() => { toggleSidebar(); navigate("/admin/adminDashboard"); }}>📊 Dashboard</li>
          <li onClick={toggleSidebar}>🍽️ Menu</li>
          <li onClick={toggleSidebar}>👤 Users</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className="menu-management">
        <div className="topbar">
          <div className="topbar-left">
            <button className="menu-btn" onClick={toggleSidebar}>☰</button>
            <div>
              <span className="topbar-kicker">Admin Panel</span>
              <h2>🍽️ Menu Management</h2>
            </div>
          </div>
        </div>

        <div className="menu-content">
          <div className="page-header">
            <div>
              <h2>🍽️ Menu Management</h2>
              <p>Add, edit, or remove menu items</p>
            </div>
            <button className="add-btn" onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }
            }}>
              {showForm ? "✕ Close" : "+ Add Item"}
            </button>
          </div>

          {showForm && (
            <div className="form-card" id="menu-form">
              <h3>{editingItem ? "✏️ Edit Item" : "➕ Add New Item"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Item Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Veg Burger"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="e.g., 150"
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tag (Optional)</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({...formData, tag: e.target.value})}
                      placeholder="e.g., Chef pick, Premium"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Image URL (Optional)</label>
                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      placeholder="e.g., /uploads/menu/burger.webp or https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingItem ? "Update Item" : "Add Item"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="filter-bar">
            <div className="filter-label">Filter by Category:</div>
            <div className="category-buttons">
              <button
                className={categoryFilter === "All" ? "active" : ""}
                onClick={() => setCategoryFilter("All")}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={categoryFilter === cat ? "active" : ""}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading menu items...</div>
          ) : filteredItems.length === 0 ? (
            <div className="empty-state">
              <h3>No items found</h3>
              <p>{categoryFilter === "All" ? "Add your first menu item!" : `No items in ${categoryFilter} category`}</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="menu-card">
                  {item.image_url && (
                    <div className="menu-card-image">
                      <img src={item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`} alt={item.name} />
                    </div>
                  )}
                  <div className="menu-card-header">
                    <span className="category-badge">{item.category}</span>
                    <button 
                      className="delete-btn"
                      onClick={() => setDeleteConfirm(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="menu-card-body">
                    <h4>{item.name}</h4>
                    <p className="price">₹{item.price}</p>
                    {item.tag && <span className="tag">{item.tag}</span>}
                  </div>

                  <div className="menu-card-footer">
                    <button className="edit-btn" onClick={() => startEdit(item)}>
                      ✏️ Edit
                    </button>
                  </div>

                  {deleteConfirm === item.id && (
                    <div className="delete-confirm">
                      <p>Delete this item?</p>
                      <div className="confirm-actions">
                        <button onClick={() => handleDelete(item.id)}>Yes, Delete</button>
                        <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
