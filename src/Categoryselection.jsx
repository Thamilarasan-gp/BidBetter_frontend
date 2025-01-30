import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categoryselection.css";

const Categoryselection = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: "Cricket", subcategories: ["Bats", "Balls", "Gloves", "Helmets", "Jerseys"] },
    { name: "Football", subcategories: ["Boots", "Goalkeeper Gloves", "Shin Guards", "Jerseys"] },
    { name: "Basketball", subcategories: ["Shoes", "Balls", "Jerseys", "Headbands"] },
    { name: "Tennis", subcategories: ["Rackets", "Balls", "Shoes"] },
    { name: "Athletics", subcategories: ["Running Shoes", "Track Suits", "Stopwatches", "Fitness Bands"] },
  ];

  const handleCategoryChange = (subcategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(subcategory)) {
        return prev.filter((item) => item !== subcategory);
      }
      if (prev.length < 3) return [...prev, subcategory];
      return prev;
    });
  };

  const handleNext = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    // Save the selected categories to localStorage
    localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));

    // Navigate to the next page
    navigate("/imageuploader");
  };

  return (
    <div className="description-container">
      <div className="breadcrumb">Sell &gt; Add Product</div>
      <h2 className="title">Select the sports category (max. 3)</h2>
      <div className="category-layout">
        <div className="main-categories">
          {["Cricket", "Football", "Basketball", "Tennis", "Athletics", "Swimming", "Badminton", "Cycling", "Hockey"].map((category, index) => (
            <p key={index} className="main-category">{category}</p>
          ))}
        </div>

        <div className="subcategories">
          {categories.map((category, index) => (
            <div key={index} className="subcategory-group">
              <h3 className="subcategory-title">{category.name}</h3>
              <div className="subcategory-items">
                {category.subcategories.map((subcategory, subIdx) => (
                  <label key={subIdx} className="subcategory-item">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(subcategory)}
                      onChange={() => handleCategoryChange(subcategory)}
                    />
                    {subcategory}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="selected-categories">
        <h4>Selected categories:</h4>
        <div className="selected-tags">
          {selectedCategories.map((category, index) => (
            <span key={index} className="selected-tag">
              {category} ×
            </span>
          ))}
        </div>
      </div>

      <div className="info-text">
        {selectedCategories.length >= 3 && (
          <p style={{ color: "red" }}>You have reached the maximum of 3 categories.</p>
        )}
      </div>

      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Categoryselection;
