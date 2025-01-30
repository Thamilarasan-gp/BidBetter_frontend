import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Description.css";

const FormGroup = ({ label, helperText, children }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    {children}
    {helperText && <p className="form-helper-text">{helperText}</p>}
  </div>
);

const Description = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sellerName, setSellerName] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();

    const itemData = {
      itemName,
      description,
      startingBid,
      endTime,
      sellerName,
    };

    // Log the data before saving to localStorage
    console.log("Item Data:", itemData);

    // Save to localStorage
    localStorage.setItem("itemData", JSON.stringify(itemData));

    // Navigate to the next page
    navigate("/categoryselection");

    // Optionally reset the form fields
    setItemName("");
    setDescription("");
    setStartingBid("");
    setEndTime("");
    setSellerName("");
  };

  return (
    <div className="description-form-container">
      <div className="form-wrapper">
        <h1 className="form-title">Description</h1>
        <form className="form-content" onSubmit={handleNext}>
          <div className="form-left">
            <FormGroup label="Item Name" helperText="38/60">
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                maxLength="60"
                placeholder="Item name"
                className="form-input"
                required
              />
            </FormGroup>
            <FormGroup label="Description" helperText="322/1200">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="1200"
                placeholder="Description"
                className="form-textarea"
                required
              ></textarea>
            </FormGroup>
          </div>

          <div className="form-right">
            <FormGroup label="Starting Bid">
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                placeholder="Starting bid"
                className="form-input"
                required
              />
            </FormGroup>
            <FormGroup label="End Time">
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-input"
                required
              />
            </FormGroup>
            <FormGroup label="Seller Name">
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Seller name"
                className="form-input"
                required
              />
            </FormGroup>
          </div>

          <div className="form-submit-wrapper">
            <button
              type="submit"
              className="form-submit-button"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Description;
