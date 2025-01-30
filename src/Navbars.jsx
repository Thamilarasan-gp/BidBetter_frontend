import React from 'react';
import { FaSignInAlt, FaHome, FaSearch, FaTrophy, FaFireAlt, FaSignOutAlt } from 'react-icons/fa';
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <img 
          src="https://www.freeiconspng.com/thumbs/auction-icon/auction-icon-27.png" 
          alt="Auction Logo" 
          className="logo-image" 
        />
      </div>

      {/* Navigation Items */}
      <div className="nav-items">
        <div className="nav-item">
          <FaSignInAlt className="icon" />
          <span className="text">Sign In</span>
        </div>
        <div className="nav-item">
          <FaHome className="icon" />
          <span className="text">Home</span>
        </div>
        <div className="nav-item">
          <FaSearch className="icon" />
          <span className="text">Search</span>
        </div>
        <div className="nav-item">
          <FaTrophy className="icon" />
          <span className="text">Winning Bid</span>
        </div>
        <div className="nav-item">
          <FaFireAlt className="icon" />
          <span className="text">Trending</span>
        </div>
        <div className="nav-item">
          <FaSignOutAlt className="icon" />
          <span className="text">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
