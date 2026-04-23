import "../../styles/user/menu.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import  { jwtDecode } from "jwt-decode";
import { useState, useEffect , useContext, useRef} from "react";
import { CartContext } from "../../context/CartContext";

function Menu() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return "";
    }

    try {
      const decoded = jwtDecode(token);
      return decoded.name || "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
  const justLoggedIn = sessionStorage.getItem("justLoggedIn");
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/", { replace: true });
  } else if (justLoggedIn) {
    sessionStorage.removeItem("justLoggedIn");
  }
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/menu");
      const data = await res.json();
      if (data.success) {
        setMenuItems(data.items);
        setFilteredItems(data.items);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredItems(menuItems);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = menuItems.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      (item.tag && item.tag.toLowerCase().includes(lowerQuery))
    );
    setFilteredItems(filtered);

    const sug = filtered.slice(0, 5);
    setSuggestions(sug);
    setShowSuggestions(sug.length > 0);
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.name);
    setFilteredItems([item]);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredItems(menuItems);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
        const activeTag = document.activeElement.tagName;
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          event.preventDefault();
          searchRef.current?.focus();
        }
      }
      
      if (event.key === "Escape") {
        handleClearSearch();
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar username={username} toggleSidebar={toggleSidebar} />

      <div className="main menu-page">
        <section className="menu-hero">
          <div>
            <span className="section-kicker">Campus canteen</span>
            <h1>Fresh food, fast ordering.</h1>
            <p>
              Browse the menu, add items in a tap, and move straight to checkout.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{menuItems.length}</strong>
              <span>Items</span>
            </div>
            <div>
              <strong>{loading ? "..." : [...new Set(menuItems.map(item => item.category))].length}</strong>
              <span>Categories</span>
            </div>
          </div>
        </section>

        <div className="search-wrapper" ref={wrapperRef}>
          <div className="search-box">
            <i className="fa fa-search search-icon"></i>
            <input 
              type="text" 
              placeholder="Search your favorite meal (Press / to focus)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(suggestions.length > 0)}
              ref={searchRef}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={handleClearSearch} aria-label="Clear search">
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
          
          {showSuggestions && (
            <div className="suggestions-dropdown">
              {suggestions.map((item) => (
                <div 
                  key={item.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <img src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`) : "https://via.placeholder.com/300"} alt={item.name} className="suggestion-img" />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{item.name}</span>
                    <span className="suggestion-details">
                      <span className="suggestion-tag">{item.tag}</span>
                      <span className="suggestion-price">₹{item.price}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section-head">
          <h3 id="title">
            {searchQuery ? `Search results for "${searchQuery}"` : "Popular picks"}
          </h3>
          <p>
            {searchQuery 
              ? `${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} found`
              : "Simple, quick, and built for repeat orders."
            }
          </p>
        </div>

        {loading ? (
          <div className="no-results">
            <div className="no-results-icon">⏳</div>
            <h3>Loading menu...</h3>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No items found</h3>
            <p>Try searching for "pizza", "drinks", or "snacks"</p>
            <button onClick={handleClearSearch} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="food-list">
          {filteredItems.map((item) => (
            <article className="food-card" key={item.id}>
              <div className="food-card__media">
                <img 
                  src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`) : "https://via.placeholder.com/300"} 
                  alt={item.name} 
                />
              </div>
              <div className="food-card__body">
                <span className="food-tag">{item.tag || item.category}</span>
                <h4>{item.name}</h4>
                <p className="food-price">₹{item.price}</p>
                <button
                  className="food-card__button"
                  onClick={() => addToCart({ 
                    id: item.id, 
                    name: item.name, 
                    price: item.price, 
                    image: item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost:5000${item.image_url}`) : "https://via.placeholder.com/300"
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
