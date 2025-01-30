import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFilter, FaSearch, FaSort, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import "./ProductCategory.css";

const ProductCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [showTwoProducts, setShowTwoProducts] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 20000]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const titles = {
      'jerseys': 'Player Jerseys',
      'balls': 'Sports Balls',
      'bats-rackets': 'Bats & Rackets',
      'glasses': 'Sports Glasses',
      'shoes': 'Sports Shoes',
      'accessories': 'Sports Accessories'
    };
    setCategoryTitle(titles[categoryId] || 'All Products');
  }, [categoryId]);

  const toggleProductView = () => {
    setShowTwoProducts(!showTwoProducts);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  const products = [
    {
      id: 1,
      name: "Virat Kohli Signed Jersey",
      price: 12000,
      bids: 5,
      seller: "Kaif Khawaja",
      sellerId: 45,
      image: "https://arena.cricketgraph.com/uploads/virat-kohli-signed-jersey-1-jpg_1721379670.jpg",
      timeLeft: "4d 20h (Sat, 02:39 PM)",
      condition: "New",
      views: 156
    },
    {
      id: 2,
      name: "MS Dhoni Match Jersey",
      price: 15000,
      bids: 7,
      seller: "Rahul Dev",
      sellerId: 32,
      image: "https://arena.cricketgraph.com/uploads/virat-kohli-signed-jersey-1-jpg_1721379670.jpg",
      timeLeft: "3d 15h (Fri, 09:30 PM)",
      condition: "Used - Like New",
      views: 89
    },
    {
      id: 3,
      name: "Rohit Sharma IPL Jersey",
      price: 9000,
      bids: 3,
      seller: "Amit Kumar",
      sellerId: 28,
      image: "https://arena.cricketgraph.com/uploads/virat-kohli-signed-jersey-1-jpg_1721379670.jpg",
      timeLeft: "5d 8h (Sun, 11:20 AM)",
      condition: "New",
      views: 234
    }
  ].filter(product => 
    product.price >= priceRange[0] && 
    product.price <= priceRange[1] &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch(sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "most-bids":
        return b.bids - a.bids;
      case "most-viewed":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <div className="product-category-container">
      <div className={`filter-section ${showFilters ? 'show' : ''}`}>
        <div className="filter-header">
          <h3>
            <FaFilter className="filter-icon" /> Filters
          </h3>
          <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
        </div>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="most-bids">Most Bids</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <div className="price-inputs">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              min="0"
              max={priceRange[1]}
            />
            <span>to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              min={priceRange[0]}
            />
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="5000"
              max="20000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
            />
            <input
              type="range"
              min="5000"
              max="20000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
            />
          </div>
        </div>

        <button className="apply-filter" onClick={toggleProductView}>
          {showTwoProducts ? "Show All" : "Apply Filter"}
        </button>
      </div>

      <div className="auction-section">
        <div className="category-header">
          <h2>{categoryTitle}</h2>
          <div className="mobile-actions">
            <button className="filter-toggle" onClick={() => setShowFilters(true)}>
              <FaFilter /> Filters
            </button>
            <div className="sort-mobile">
              <FaSort />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="most-bids">Bids</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`auction-grid ${showTwoProducts ? "two-products" : "all-products"}`}>
          {products.map((product) => (
            <div key={product.id} className="auction-item">
              <div className="product-image-container" onClick={() => handleProductClick(product.id)}>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="quick-view">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="price-row">
                  <strong>₹{product.price.toLocaleString()}</strong>
                  <span className="bids">{product.bids} bids</span>
                </div>
                <div className="seller-row">
                  <span>{product.seller}</span>
                  <span className="seller-id">#{product.sellerId}</span>
                </div>
                <div className="product-meta">
                  <span className="condition">{product.condition}</span>
                  <span className="views"><FaEye /> {product.views}</span>
                </div>
                <div className="time-row">
                  <p className="time-left">Time left: {product.timeLeft}</p>
                  <button 
                    className="favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    {favorites.has(product.id) ? <FaHeart className="favorited" /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="prev" disabled>Previous</button>
          <div className="page-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <span>...</span>
            <button className="page-number">9</button>
            <button className="page-number">10</button>
          </div>
          <button className="next">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
