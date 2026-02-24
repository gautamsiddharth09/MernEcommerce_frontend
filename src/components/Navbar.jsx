import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // new state for overlay
  const [searchQuery, setSearchQuery] = useState("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
    setIsSearchOpen(false); // close overlay after search
  };

  // TRAIL

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="StyleNest Logo" />
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              StyleNest
            </Link>
          </div>

          <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <ul>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/products">Products</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/about-us">About-us</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-icons">
            <div className="search-icon-container" onClick={toggleSearch}>
              <SearchIcon className="icon" />
            </div>

            <div className="cart-container">
              <Link to="/cart">
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">{cartItems.length}</span>
              </Link>
            </div>

            {!isAuthenticated && (
              <Link to="/register" className="register-link">
                <PersonAddIcon className="icon" />
              </Link>
            )}

            <div className="navbar-hamburger" onClick={toggleMenu}>
              {isMenuOpen ? (
                <CloseIcon className="icon" />
              ) : (
                <MenuIcon className="icon" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay">
          <form className="search-form-overlay" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">
              <SearchIcon />
            </button>
            <button type="button" className="close-btn" onClick={toggleSearch}>
              <CloseIcon className="close-icon" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
